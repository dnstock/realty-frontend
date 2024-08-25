import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedAuthState = localStorage.getItem('isAuthenticated');
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedAuthState && storedToken && storedUser) {
      const isTokenValid = !isTokenExpired(storedToken);
      if (isTokenValid) {
        setIsAuthenticated(JSON.parse(storedAuthState));
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      } else {
        refreshToken(storedToken);
      }
    }
  }, []);

  const isTokenExpired = (token) => {
    try {
      const decoded = jwtDecode(token);
      return decoded.exp < Date.now() / 1000;
    } catch (err) {
      return true;
    }
  };

  const refreshToken = async (oldToken) => {
    try {
      const response = await axios.post('http://localhost:8000/token/refresh', { token: oldToken });
      const newToken = response.data.access_token;
      const userData = jwtDecode(newToken);

      setIsAuthenticated(true);
      setToken(newToken);
      setUser(userData);

      localStorage.setItem('isAuthenticated', true);
      localStorage.setItem('token', newToken);
      localStorage.setItem('user', JSON.stringify(userData));
    } catch (error) {
      console.error('Failed to refresh token', error);
      logout();
    }
  };

  const login = (authToken, userData) => {
    setIsAuthenticated(true);
    setToken(authToken);
    setUser(userData);

    localStorage.setItem('isAuthenticated', true);
    localStorage.setItem('token', authToken);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setIsAuthenticated(false);
    setToken(null);
    setUser(null);

    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

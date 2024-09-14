import { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/ApiService';

export const useAuthState = () => {
  const navigate = useNavigate();
  const [authState, setAuthState] = useState({});

  const logout = useCallback(async (redirectDelay = 0, redirectUrl = '/login') => {
    try {
      await apiService.logout(); // Call the backend logout API
    } catch (error) {
      console.error("Failed to log out", error);
    }
    setAuthState({}); // Clear state
    if (redirectDelay === -1) return; // No redirect
    const timer = setTimeout(() => navigate(redirectUrl), redirectDelay * 1000);
    return () => clearTimeout(timer);
  }, [navigate]);

  const login = useCallback(async (credentials) => {
    try {
      const res = await apiService.login(credentials);
      setAuthState({ user: res.user }); // Store user info if needed
      console.log('Login successful');
    } catch (error) {
      console.error('Login failed', error);
      throw error; // Re-throw error to handle it in the login page
    }
  }, []);

  const refreshToken = useCallback(async () => {
    try {
      await apiService.tokenRefresh();
    } catch (error) {
      console.error('Failed to refresh token', error);
      logout();
    }
  }, [logout]);

  const isAuthenticated = useCallback(() => {
    return !!authState.user; // Token is handled in cookies, so just check for user
  }, [authState.user]);

  useEffect(() => {
    // Optionally check if the user is authenticated when the component mounts
    // Can make a call to the backend to verify if the user is logged in
  }, []);

  const authContextValue = useMemo(
    () => ({
      ...authState,
      login,
      logout,
      refreshToken,
      isAuthenticated,
    }),
    [authState, login, logout, refreshToken, isAuthenticated]
  );

  return authContextValue;
};

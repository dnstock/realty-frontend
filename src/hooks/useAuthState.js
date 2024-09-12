import { useState, useEffect, useMemo, useCallback } from 'react';
import authService from '../services/AuthService';
import apiService from '../services/ApiService';
import { useApi } from './useApi';
import { useNavigate } from 'react-router-dom';

export const useAuthState = () => {
  const navigate = useNavigate();

  const [authState, setAuthState] = useState(() => ({
    accessToken: authService.getAccessToken(),
    refreshToken: authService.getRefreshToken(),
  }));

  // redirectDelay is used to add a delay (in seconds) before redirecting to the login page
  // 0 = no delay (default), -1 = do not redirect (useful for testing), >0 = delay in seconds
  const logout = useCallback((redirectDelay = 0, redirectUrl = '/login') => {
    setAuthState({ 
      accessToken: null, 
      refreshToken: null, 
    });
    authService.clearAuthData();

    // Do not redirect 
    if (redirectDelay === -1) return;

    // Redirect after the specified delay and return cleanup function
    const timer = setTimeout(() => navigate(redirectUrl), redirectDelay * 1000);
    return () => clearTimeout(timer);
  }, [navigate]);

  const login = useCallback(async (credentials) => {
    try {
      const res = await apiService.login(credentials);
      setAuthState({ 
        accessToken: res.access_token, 
        refreshToken: res.refresh_token,
      });
      authService.setAuthData(res.access_token, res.refresh_token);
      console.log('Login successful');
    } catch (error) {
      console.error('Login failed', error);
      throw error; // Re-throw error to handle it in the login page
    }
  }, []);

  const refreshToken = useCallback(async () => {
    if (!authState.refreshToken) return;
    try {
      const res = await apiService.tokenRefresh();
      setAuthState((prevState) => ({
        ...prevState,
        accessToken: res.access_token,
      }));
      authService.setAuthData(res.access_token, authState.refreshToken);
    } catch (error) {
      console.error('Failed to refresh token', error);
      logout();
    }
  }, [authState.refreshToken, logout]);

  const isAuthenticated = useCallback(() => {
    return !!authState.accessToken && !authService.isTokenExpired(authState.accessToken);
  }, [authState.accessToken]);

  // Create API object with token refresh handling
  const api = useApi(refreshToken, logout); // Pass callback functions

  // Check and refresh token on load or when accessToken changes
  useEffect(() => {
    if (authState.accessToken && authService.isTokenExpired(authState.accessToken)) {
      refreshToken();
    }
  }, [authState.accessToken, refreshToken]);

  const authContextValue = useMemo(
    () => ({
      ...authState,
      api,
      login,
      logout,
      refreshToken,
      isAuthenticated,
    }),
    [authState, api, login, logout, refreshToken, isAuthenticated]
  );

  return authContextValue;
};

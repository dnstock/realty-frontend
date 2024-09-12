import { useState, useEffect, useMemo, useCallback } from 'react';
import authService from '../services/AuthService';
import { useApi } from './useApi';
import { useNavigate } from 'react-router-dom';

export const useAuthState = () => {
  const navigate = useNavigate();

  const [authState, setAuthState] = useState(() => ({
    accessToken: authService.getAccessToken(),
    refreshToken: authService.getRefreshToken(),
    user: authService.getUser(),
  }));

  const login = useCallback((authToken, refreshToken, userData) => {
    setAuthState({ accessToken: authToken, refreshToken: refreshToken, user: userData });
    authService.setAuthData(authToken, refreshToken, userData);
  }, []);

  // redirectDelay is used to add a delay (in seconds) before redirecting to the login page
  // 0 = no delay (default), -1 = do not redirect (useful for testing), >0 = delay in seconds
  const logout = useCallback((redirectDelay = 0, redirectUrl = '/login') => {
    setAuthState({ accessToken: null, refreshToken: null, user: null });
    authService.clearAuthData();

    // Do not redirect 
    if (redirectDelay === -1) return;

    // Redirect after the specified delay and return cleanup function
    const timer = setTimeout(() => navigate(redirectUrl), redirectDelay * 1000);
    return () => clearTimeout(timer);
  }, [navigate]);

  const api = useApi(logout); // Pass logout callback

  const refreshToken = useCallback(async () => {
    if (!authState.refreshToken) return;
    try {
      const { access_token } = await api.tokenRefresh();
      setAuthState((prevState) => ({
        ...prevState,
        accessToken: access_token,
      }));
      authService.setAuthData(access_token, authState.refreshToken, authState.user);
    } catch (error) {
      console.error('Failed to refresh token', error);
      logout();
    }
  }, [authState.refreshToken, authState.user, api, logout]);

  const isAuthenticated = useCallback(() => {
    return !!authState.accessToken && !authService.isTokenExpired(authState.accessToken);
  }, [authState.accessToken]);

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

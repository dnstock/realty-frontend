import { useState, useEffect, useMemo } from 'react';
import authService from '../services/AuthService';
import { useApi } from './useApi';
import { useNavigate } from 'react-router-dom';

export const useAuthState = () => {
  const navigate = useNavigate();
  const api = useApi(logout); // Pass logout callback

  const [authState, setAuthState] = useState(() => ({
    accessToken: authService.getAccessToken(),
    refreshToken: authService.getRefreshToken(),
    user: authService.getUser(),
  }));

  const refreshToken = async () => {
    if (!authState.refreshToken) return;
    try {
      const { access_token } = await api.tokenRefresh();
      setAuthState((prevState) => ({
        ...prevState,
        accessToken: access_token,
      }));
      AuthService.setAuthData(access_token, authState.refreshToken, authState.user);
    } catch (error) {
      console.error('Failed to refresh token', error);
      logout();
    }
  };

  const login = (authToken, refreshToken, userData) => {
    setAuthState({ accessToken: authToken, refreshToken: refreshToken, user: userData });
  };
    authService.setAuthData(authToken, refreshToken, userData);

  // redirectDelay is used to add a delay (in seconds) before redirecting to the login page
  // 0 = no delay (default), -1 = do not redirect (useful for testing), >0 = delay in seconds
  const logout = (redirectDelay = 0) => {
    setAuthState({ accessToken: null, refreshToken: null, user: null });
    authService.clearAuthData();

    // Do not redirect 
    if (redirectDelay === -1) return;

    // Redirect after the specified delay and return cleanup function
    const timer = setTimeout(() => navigate('/login'), redirectDelay * 1000);
    return () => clearTimeout(timer);
  };

  const isAuthenticated = () => {
    return !!authState.accessToken && !AuthService.isTokenExpired(authState.accessToken);
  };

  // Check and refresh token on load or when accessToken changes
  useEffect(() => {
    if (authState.accessToken && authService.isTokenExpired(authState.accessToken)) {
      refreshToken();
    }
  }, [authState.accessToken]);

  const authContextValue = useMemo(
    () => ({
      ...authState,
      api,
      login,
      logout,
      refreshToken,
      isAuthenticated,
    }),
    [authState]
  );

  return authContextValue;
};
import { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from 'services/ApiService';

const useAuthState = () => {
  const navigate = useNavigate();
  const [authState, setAuthState] = useState({
    user: null,
    loading: true,
    error: null,
  });

  const updateAuthState = (updates) => {
    setAuthState((prevState) => ({ ...prevState, ...updates }));
  };

  // Check if the user is logged in
  const checkAuthStatus = useCallback(async () => {
    try {
      const user = await apiService.fetchCurrentUser();
      updateAuthState({ user, error: null});
    } catch (error) {
      console.error('Error checking auth status', error);
      updateAuthState({ error });
    } finally {
      updateAuthState({ loading: false });
    }
  }, []);

  // Called when component mounts (e.g. page load)
  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  const logout = useCallback(async (redirectDelay = 0, redirectUrl = '/login') => {
    try {
      await apiService.logout();
      updateAuthState({ user: null, error: null });
      // Redirect if necessary
      if (redirectDelay !== -1) {
        const timer = setTimeout(() => navigate(redirectUrl), redirectDelay * 1000);
        return () => clearTimeout(timer);
      }
    } catch (error) {
      console.error('Logout failed', error);
      updateAuthState({ error });
      throw error; // Re-throw error to handle it on page
    }
  }, [navigate]);

  const login = useCallback(async (credentials) => {
    try {
      const user = await apiService.login(credentials);
      updateAuthState({ user, error: null });
    } catch (error) {
      console.error('Login failed', error);
      updateAuthState({ error });
      throw error; // Re-throw error to handle it on page
    }
  }, []);

  const isAuthenticated = useMemo(() => !!authState.user, [authState.user]);

  return {
    ...authState,
    login,
    logout,
    isAuthenticated,
  };
};

export default useAuthState;

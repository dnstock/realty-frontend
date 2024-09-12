import apiService from '../services/ApiService';

export const useApi = (refreshTokenCallback, logoutCallback) => {
  // Handle token expiration (401) and refresh the access token
  const handle401Error = async (error) => {
    if (error.response && error.response.status === 401) {
      try {
        // Attempt to refresh the token
        const res = await refreshTokenCallback();

        // Retry the original request with the new token
        error.config.headers.Authorization = `Bearer ${res.access_token}`;
        return apiService.client(error.config);  // Retry
      } catch (refreshError) {
        // If refresh fails, log the user out
        logoutCallback();
      }
    }
    return Promise.reject(error);
  };

  // API functions that handle authenticated requests and token refresh
  // Note: These do not include login and token refresh functions
  const safeFetchDashboardData = async () => {
    try {
      return await apiService.fetchDashboardData();
    } catch (error) {
      await handle401Error(error);
    }
  };

  return {
    fetchDashboardData: safeFetchDashboardData,
  };
};

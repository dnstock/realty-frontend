import ApiService from '../services/ApiService';

export const useApi = (logoutCallback) => {
  // Handle token expiration (401) and refresh the access token
  const handle401Error = async (error) => {
    if (error.response && error.response.status === 401) {
      try {
        // Attempt to refresh the token
        const data = await ApiService.tokenRefresh();

        // Retry the original request with the new token
        error.config.headers.Authorization = `Bearer ${data.access_token}`;
        return ApiService.client(error.config);  // Retry
      } catch (refreshError) {
        // If refresh fails, log the user out
        logoutCallback();
      }
    }
    return Promise.reject(error);
  };

  // API functions that handle errors and 401 response
  const safeFetchDashboardData = async () => {
    try {
      return await ApiService.fetchDashboardData();
    } catch (error) {
      await handle401Error(error);
    }
  };

  return {
    login: ApiService.login,
    tokenRefresh: ApiService.tokenRefresh,
    fetchDashboardData: safeFetchDashboardData,
  };
};

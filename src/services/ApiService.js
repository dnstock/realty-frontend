import axios from 'axios';

class ApiService {
  constructor() {
    this.client = this.createClient();
    this.initializeResponseInterceptor();
  }

  // Helper function to create axios instance
  createClient() {
    return axios.create({
      baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api/v1',
      withCredentials: true, // Enable cookies for cross-site requests
    });
  }

  // Helper function to initialize the response interceptor
  initializeResponseInterceptor() {
    this.client.interceptors.response.use(
      this.handleSuccessResponse, // Handle successful responses
      this.handleErrorResponse // Handle 401 and other errors
    );
  }

  // Success response handler
  handleSuccessResponse(response) {
    return response; // Return the response directly if successful
  }

  // Error response handler
  handleErrorResponse = async (error) => {
    const originalRequest = error.config;

    // Skip retry logic for login and refresh requests
    if (this.isAuthRequest(originalRequest)) {
      return Promise.reject(error);
    }

    // Handle 401 Unauthorized errors
    if (error.response && error.response.status === 401) {
      try {
        await this.tokenRefresh(); // Attempt to refresh token
        return this.client(originalRequest); // Retry original request
      } catch (refreshError) {
        console.error('Failed to refresh token, logging out', refreshError);
        await this.logout(); // Log out if token refresh fails
      }
    }

    return Promise.reject(error); // Reject other errors
  }

  // Helper function to check if the request is for any authentication-related route
  isAuthRequest(config) {
    try {
      const fullUrl = new URL(config.url, config.baseURL); // Combine url and baseURL
      return fullUrl.pathname.startsWith('/auth/');
    } catch (error) {
      console.error('Error parsing URL in isAuthRequest:', error);
      return false;
    }
  }

  // API functions
  login = async (credentials) => {
    credentials.username = credentials.email; // Rename email to username
    return this.client.post('/auth/login', credentials, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    }).then((response) => response.data);
  }

  logout = async () => {
    return this.client.post('/auth/logout').then((response) => response.data);
  }

  tokenRefresh = async () => {
    return this.client.post('/auth/refresh').then((response) => response.data);
  }

  updateProfile = async (profileData) => {
    return this.client.put('/user', profileData).then((response) => response.data);
  }

  fetchDashboardData = async () => {
    return this.client.get('/dashboard').then((response) => response.data);
  }
}

export default new ApiService();

import axios from 'axios';
import authService from './AuthService';

class ApiService {
  constructor() {
    // Create client instance
    this.client = axios.create({
      baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api/v1',
    });
    // Set up request interceptor for authorization header
    this.client.interceptors.request.use(
      (config) => {
        const token = authService.getAccessToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
  }
  
  login = async (credentials) => {
    credentials.username = credentials.email; // Rename email to username
    return this.client.post('/auth/login', credentials, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    }).then((response) => response.data);
  }

  tokenRefresh = async () => {
    return this.client.post('/auth/refresh', {
      refresh_token: authService.getRefreshToken(),
    }).then((response) => response.data);
  }

  // Fetch data with authentication
  fetchDashboardData = async () => {
    return this.client.get('/dashboard').then((response) => response.data);
  }
}

const apiService = new ApiService(); // Create a singleton instance
export default apiService;

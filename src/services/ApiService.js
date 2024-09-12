import axios from 'axios';

class ApiService {
  constructor() {
    // Create client instance
    this.client = axios.create({
      baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api/v1',
    });

    // Set up request interceptor for authorization header
    this.client.interceptors.request.use(
      (config) => {
        const token = this._getAccessToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
  }

  _getAccessToken = () => localStorage.getItem('access_token');
  _getRefreshToken = () => localStorage.getItem('refresh_token');
  _saveAccessToken = (token) => localStorage.setItem('access_token', token);
  
  async login(credentials) {
    return this.client.post('/auth/login', credentials, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    }).then((response) => response.data);
  }

  async tokenRefresh() {
    return this.client.post('/auth/refresh', {
      refresh_token: this._getRefreshToken(),
    }).then((response) => {
      // Save the new access token upon successful refresh
      this._saveAccessToken(response.data.access_token);
      return response.data;
    });
  }

  // Fetch data with authentication
  async fetchDashboardData() {
    return this.client.get('/dashboard').then((response) => response.data);
  }
}

const apiService = new ApiService(); // Create a singleton instance
export default apiService;

import axios from 'axios';

class ApiService {
  constructor() {
    this.client = axios.create({
      baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api/v1',
      withCredentials: true, // Enable cookies for cross-site requests
    });
  }

  // Generic HTTP methods
  get = async (url) => this.client.get(url).then(response => response.data);

  post = async (url, data) => this.client.post(url, data).then(response => response.data);
  
  put = async (url, data) => this.client.put(url, data).then(response => response.data);

  delete = async (url) => this.client.delete(url).then(response => response.data);

  // API functions
  login = async (credentials) => {
    credentials.username = credentials.email; // Rename email to username
    return this.client.post('/auth/login', credentials, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    }).then(response => response.data);
  }

  logout = async () => this.client.post('/auth/logout').then(response => response.data);

  fetchCurrentUser = async () => this.client.get('/auth/me').then(response => response.data);

  updateUserProfile = async (userProfileData) => this.client.put('/user', userProfileData).then(response => response.data);

  fetchDashboardData = async () => this.client.get('/dashboard').then(response => response.data);
}

const apiService = new ApiService();
export default apiService;

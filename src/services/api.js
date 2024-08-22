import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000', // Adjust to the base URL as needed
});

export const login = async (credentials) => {
    const response = await api.post('/login', credentials, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    });
    return response.data;
}

export const fetchDashboardData = async () => {
    const response = await api.get('/dashboard');
    return response.data;
}

export default api;

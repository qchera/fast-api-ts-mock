import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8080';

const client = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
});

client.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    console.log(`Request to ${config.url} - Token exists: ${!!token}`);
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

client.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            console.error('API Error:', error.response.status, error.response.data);
        } else {
            console.error('Network/CORS Error:', error.message);
        }

        if (error.response?.status === 401) {
            console.warn('401 Unauthorized - Redirecting to login...');
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default client;
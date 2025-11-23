import axios from 'axios';
import store from '../redux/store';
import { setError } from '../redux/slices/errorSlice';
import {disconnectSocket} from "../redux/actions/socketActions.ts";

const BASE_URL = 'http://127.0.0.1:8080';

const client = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
});

client.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

client.interceptors.response.use(
    (response) => response,
    (error) => {
        let errorMessage = "Something went wrong";

        if (error.response) {
            errorMessage = error.response.data?.detail || `Error: ${error.response.status}`;
            console.error('API Error:', error.response.status, error.response.data);
        } else if (error.request) {
            errorMessage = "Network Error: No response from server";
            console.error('Network Error:', error.message);
        } else {
            errorMessage = error.message;
        }

        store.dispatch(setError(errorMessage));

        if (error.response?.status === 401) {
            console.warn('401 Unauthorized - Redirecting to login...');
            store.dispatch(disconnectSocket())
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default client;
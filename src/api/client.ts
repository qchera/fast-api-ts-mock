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
        let errorCode = "UNKNOWN";
        let errorMeta = null

        if (error.response) {
            errorMessage = error?.response?.data?.detail?.message || `Error: ${error.response.status}`;
            errorCode = error?.response?.data?.detail?.code
            errorMeta = error?.response?.data?.detail?.meta
            console.error('API Error:', error.response.status, error.response.data);
        } else if (error.request) {
            errorMessage = "Network Error: No response from server";
            console.error('Network Error:', error.message);
        } else {
            errorMessage = error.message;
        }

        store.dispatch(setError({
            message: errorMessage,
            code: errorCode,
            meta: errorMeta,
        }));

        if (error.response?.status === 401) {
            console.warn('401 Unauthorized - Redirecting to login...');
            store.dispatch(disconnectSocket())
            localStorage.removeItem('token');
            const isLoginPage = window.location.pathname === '/login'
            const isEmailVerificationPage = window.location.pathname === '/verify-email'
            if (!isLoginPage && !isEmailVerificationPage) {
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export default client;
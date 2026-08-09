import axios from 'axios';
import { API_BASE_URL, AUTH_TOKEN_STORAGE_KEY } from '../constants/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { Accept: 'application/json' },
  timeout: 15_000,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);

  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.detail
      || error.response?.data?.message
      || error.message
      || 'Something went wrong. Please try again.';

    if (error.response?.status === 401) {
      localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
      window.dispatchEvent(new Event('auth:unauthorized'));
    }

    return Promise.reject(new Error(message));
  },
);

export default apiClient;

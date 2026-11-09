import axios, { AxiosError, type AxiosInstance } from 'axios';
import type { ApiErrorBody } from '../types';

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

api.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (error instanceof AxiosError) {
      const data = error.response?.data as ApiErrorBody | undefined;
      const message =
        data?.message || error.message || 'Something went wrong. Please try again.';
      return Promise.reject(new Error(message));
    }

    if (error instanceof Error) {
      return Promise.reject(error);
    }

    return Promise.reject(new Error('Something went wrong. Please try again.'));
  }
);

export default api;

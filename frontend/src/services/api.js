// src/services/api.js
import axios from 'axios';

// Đọc base URL từ biến môi trường hoặc mặc định
const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

// Tạo axios instance
const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: false // đổi thành true nếu backend dùng cookie/session
});

// Interceptor request: gắn token nếu có
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  error => Promise.reject(error)
);

// Xử lý refresh token khi gặp 401
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    error ? prom.reject(error) : prom.resolve(token);
  });
  failedQueue = [];
};

api.interceptors.response.use(
  response => response,
  err => {
    const originalRequest = err.config;
    if (err.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(token => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;
      const refreshToken = localStorage.getItem('refresh');

      return new Promise((resolve, reject) => {
        axios.post(`${API_BASE}/users/refresh/`, { refresh: refreshToken })
          .then(({ data }) => {
            const newToken = data.token;
            localStorage.setItem('token', newToken);
            api.defaults.headers.Authorization = `Bearer ${newToken}`;
            processQueue(null, newToken);
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            resolve(api(originalRequest));
          })
          .catch(error => {
            processQueue(error, null);
            // nếu refresh fail → logout
            // logoutUser();
            reject(error);
          })
          .finally(() => { isRefreshing = false; });
      });
    }
    return Promise.reject(err);
  }
);

// Auth API helpers
export const loginUser = (credentials) =>
  api.post('/users/login/', credentials)
     .then(res => {
       const { token, refresh } = res.data;
       localStorage.setItem('token', res.data.token.access);
       localStorage.setItem('refresh', res.data.token.refresh);
       api.defaults.headers.Authorization = `Bearer ${token}`;
       return res.data;
     });

export const registerUser = (userData) =>
  api.post('/users/register/', userData);

export const getProfile = () =>
  api.get('/users/me/');

export const logoutUser = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('refresh');
  localStorage.removeItem('user_id');
  delete api.defaults.headers.Authorization;
  window.location.href = '/login';
};

export default api;

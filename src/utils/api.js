// api.js
import axios from 'axios';
import i18n from 'i18next';

// Get the base URL from environment variable
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL, // use env variable
});

// Add interceptor for every request
api.interceptors.request.use((config) => {
  config.headers['Accept-Language'] = i18n.language;
  return config;
});

export default api;

// axiosConfig.ts
import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;
// Set up an Axios request interceptor
axios.interceptors.request.use(
  (config) => {
    // Get CSRF token from localStorage
    const csrfToken = localStorage.getItem('X-XSRF-TOKEN');

    // If CSRF token is available, add it to the request headers
    if (csrfToken) {
      config.headers['X-XSRF-TOKEN'] = csrfToken;
    }

    // Return the modified config
    return config;
  },
  (error) => {
    // Handle any request errors
    return Promise.reject(error);
  }
);

// You can also set base URL and other configurations globally
axios.defaults.baseURL = `${API_URL}`; // Example base URL
export default axios;

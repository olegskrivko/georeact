// // import axios from 'axios';
// // import { jwtDecode } from 'jwt-decode';
// // const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
// // const axiosInstance = axios.create({
// //   baseURL: `${API_BASE_URL}`,
// // });
// // axiosInstance.interceptors.request.use(
// //   async (config) => {
// //     const accessToken = localStorage.getItem('access_token');
// //     if (accessToken) {
// //       config.headers.Authorization = `Bearer ${accessToken}`;
// //     }
// //     return config;
// //   },
// //   (error) => Promise.reject(error),
// // );
// // // Optionally: response interceptor for refresh on 401
// // // (Add logic similar to your refreshAccessToken function)
// // export default axiosInstance;
// import axios from 'axios';
// import { jwtDecode } from 'jwt-decode';

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// const axiosInstance = axios.create({
//   baseURL: `${API_BASE_URL}`,
// });

// axiosInstance.interceptors.request.use((config) => {
//   const accessToken = localStorage.getItem('access_token');
//   if (accessToken) {
//     config.headers.Authorization = `Bearer ${accessToken}`;
//   }
//   return config;
// });

// // Optional: auto-refresh token on 401
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;
//     if (error.response?.status === 401 && !originalRequest._retry && localStorage.getItem('refresh_token')) {
//       originalRequest._retry = true;

//       try {
//         const refreshResponse = await axios.post(`${API_BASE_URL}/api/auth/token/refresh/`, {
//           refresh: localStorage.getItem('refresh_token'),
//         });

//         const newAccess = refreshResponse.data.access;
//         localStorage.setItem('access_token', newAccess);
//         axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newAccess}`;
//         originalRequest.headers['Authorization'] = `Bearer ${newAccess}`;

//         return axiosInstance(originalRequest);
//       } catch (refreshError) {
//         localStorage.removeItem('access_token');
//         localStorage.removeItem('refresh_token');
//         window.location.href = '/login'; // optional: redirect to login
//       }
//     }

//     return Promise.reject(error);
//   },
// );

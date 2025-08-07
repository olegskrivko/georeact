// import React, { createContext, useContext, useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { jwtDecode } from 'jwt-decode';
// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
// const isTokenExpired = (token) => {
//   try {
//     const decoded = jwtDecode(token);
//     const now = Date.now() / 1000;
//     return decoded.exp < now;
//   } catch (e) {
//     return true;
//   }
// };
// const AuthContext = createContext();
// export const useAuth = () => useContext(AuthContext);
// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [isAuthLoading, setIsAuthLoading] = useState(true);
//   const navigate = useNavigate();
//   const getUserFromToken = () => {
//     try {
//       const accessToken = localStorage.getItem('access_token');
//       if (!accessToken || isTokenExpired(accessToken)) return null;
//       const decodedToken = jwtDecode(accessToken);
//       return decodedToken ? { userId: decodedToken.user_id } : null;
//     } catch (err) {
//       return null;
//     }
//   };
//   const fetchUserDetails = async () => {
//     try {
//       const accessToken = localStorage.getItem('access_token');
//       if (!accessToken) {
//         setIsAuthLoading(false);
//         return;
//       }
//       const response = await axios.get(`${API_BASE_URL}/api/auth/user/`, {
//         headers: { Authorization: `Bearer ${accessToken}` },
//       });
//       if (response.data?.username && response.data?.email) {
//         setUser({
//           userId: response.data.id,
//           username: response.data.username,
//           email: response.data.email,
//           avatar: response.data.avatar,
//         });
//       }
//     } catch (err) {
//       console.error('Error fetching user:', err);
//     } finally {
//       setIsAuthLoading(false);
//     }
//   };
//   useEffect(() => {
//     const existingUser = getUserFromToken();
//     if (existingUser) {
//       fetchUserDetails();
//     } else {
//       setIsAuthLoading(false);
//     }
//   }, []);
//   const login = async (email, password) => {
//     try {
//       const response = await axios.post(`${API_BASE_URL}/api/auth/login/`, {
//         email,
//         password,
//       });
//       const { access, refresh } = response.data;
//       localStorage.setItem('access_token', access);
//       localStorage.setItem('refresh_token', refresh);
//       await fetchUserDetails();
//       return { success: true };
//     } catch (err) {
//       if (err.response) {
//         // Grab error message from backend
//         const message = err.response.data?.error || err.response.data?.detail || 'Nepareizs e-pasts vai parole';
//         return { success: false, message };
//       }
//       return { success: false, message: 'Radās kļūda pieteikšanās laikā' };
//     }
//   };
//   // const logout = () => {
//   //   localStorage.removeItem('access_token');
//   //   localStorage.removeItem('refresh_token');
//   //   setUser(null);
//   // };
//   const logout = async () => {
//     try {
//       const refreshToken = localStorage.getItem('refresh_token');
//       if (!refreshToken) throw new Error('No refresh token');
//       await axios.post(
//         `${API_BASE_URL}/api/auth/token/blacklist/`,
//         { refresh: refreshToken },
//         { headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` } },
//       );
//     } catch (err) {
//       console.warn('Logout API failed or no token, continuing...');
//     } finally {
//       localStorage.removeItem('access_token');
//       localStorage.removeItem('refresh_token');
//       setUser(null);
//       navigate('/login'); // Optional redirect after logout
//     }
//   };
//   return <AuthContext.Provider value={{ user, login, logout, isAuthLoading }}>{children}</AuthContext.Provider>;
// };
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

// fix import (remove curly braces)

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const isTokenExpired = (token) => {
  try {
    const decoded = jwtDecode(token);
    const now = Date.now() / 1000;
    return decoded.exp < now;
  } catch (e) {
    return true;
  }
};

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const navigate = useNavigate();

  const getAccessToken = () => localStorage.getItem('access_token');
  const getRefreshToken = () => localStorage.getItem('refresh_token');

  const logout = async () => {
    try {
      const refreshToken = getRefreshToken();
      if (refreshToken) {
        await axios.post(
          `${API_BASE_URL}/api/auth/token/blacklist/`,
          { refresh: refreshToken },
          { headers: { Authorization: `Bearer ${getAccessToken()}` } },
        );
      }
    } catch {
      // Ignore errors here, logout anyway
    } finally {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      setUser(null);
      navigate('/login');
    }
  };

  // Refresh token function
  const refreshAccessToken = async () => {
    const refreshToken = getRefreshToken();
    if (!refreshToken) {
      logout();
      return null;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/token/refresh/`, {
        refresh: refreshToken,
      });
      const newAccessToken = response.data.access;
      localStorage.setItem('access_token', newAccessToken);
      return newAccessToken;
    } catch (error) {
      logout();
      return null;
    }
  };

  // Get user info from backend
  const fetchUserDetails = async () => {
    try {
      let accessToken = getAccessToken();
      if (!accessToken) {
        setIsAuthLoading(false);
        return;
      }

      // Refresh token if expired before request
      if (isTokenExpired(accessToken)) {
        accessToken = await refreshAccessToken();
        if (!accessToken) {
          setIsAuthLoading(false);
          return;
        }
      }

      const response = await axios.get(`${API_BASE_URL}/api/auth/user/`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (response.data?.username && response.data?.email) {
        setUser({
          userId: response.data.id,
          username: response.data.username,
          email: response.data.email,
          avatar: response.data.avatar,
        });
      }
    } catch (err) {
      console.error('Error fetching user:', err);
      // If 401 unauthorized, try to refresh token once more or logout
      if (err.response?.status === 401) {
        const newAccessToken = await refreshAccessToken();
        if (newAccessToken) {
          await fetchUserDetails(); // Retry with new token
          return;
        }
        logout();
      }
    } finally {
      setIsAuthLoading(false);
    }
  };

  // On app load: check token and get user details
  useEffect(() => {
    fetchUserDetails();
  }, []);

  // Login function stays mostly the same
  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/login/`, {
        email,
        password,
      });
      const { access, refresh } = response.data;

      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);

      await fetchUserDetails();
      return { success: true };
    } catch (err) {
      if (err.response) {
        const message = err.response.data?.error || err.response.data?.detail || 'Invalid email or password';
        return { success: false, message };
      }
      return { success: false, message: 'Error during login' };
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, refreshAccessToken, isAuthLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

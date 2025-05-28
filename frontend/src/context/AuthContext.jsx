import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Set auth token
  const setAuthToken = (token) => {
    if (token) {
      axios.defaults.headers.common['x-auth-token'] = token;
      localStorage.setItem('token', token);
    } else {
      delete axios.defaults.headers.common['x-auth-token'];
      localStorage.removeItem('token');
    }
  };

  // Load user
  const loadUser = async () => {
    if (token) {
      setAuthToken(token);
      
      try {
        const res = await axios.get('/auth/me');
        setUser(res.data);
        setIsAuthenticated(true);
      } catch (err) {
        // Token is invalid or expired
        setToken(null);
        setUser(null);
        setIsAuthenticated(false);
        setAuthToken(null);
      }
    }
    setLoading(false);
  };

  // Register user
  const register = async (formData) => {
    try {
      const res = await axios.post('/auth/register', formData);
      setToken(res.data.token);
      await loadUser();
      return { success: true };
    } catch (err) {
      setError(
        err.response && err.response.data.errors
          ? err.response.data.errors[0].msg
          : 'Registration failed'
      );
      return { success: false, error: err.response?.data?.errors[0]?.msg || 'Registration failed' };
    }
  };

  // Login user
  const login = async (email, password) => {
    try {
      const res = await axios.post('/auth/login', { email, password });
      setToken(res.data.token);
      await loadUser();
      return { success: true };
    } catch (err) {
      setError(
        err.response && err.response.data.errors
          ? err.response.data.errors[0].msg
          : 'Invalid credentials'
      );
      return { success: false, error: err.response?.data?.errors[0]?.msg || 'Invalid credentials' };
    }
  };

  // Logout user
  const logout = () => {
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    setAuthToken(null);
  };

  // Get user role
  const getUserRole = () => {
    return user ? user.role : null;
  };

  // Check if token is expired
  const isTokenExpired = () => {
    if (!token) return true;
    
    try {
      const decoded = jwtDecode(token);
      return decoded.exp * 1000 < Date.now();
    } catch (err) {
      return true;
    }
  };

  // Clear error
  const clearError = () => {
    setError(null);
  };

  // Effect for loading user
  useEffect(() => {
    loadUser();
  }, [token]);

  // Check token expiration periodically
  useEffect(() => {
    const checkTokenInterval = setInterval(() => {
      if (token && isTokenExpired()) {
        logout();
      }
    }, 60000); // Check every minute

    return () => clearInterval(checkTokenInterval);
  }, [token]);

  const value = {
    token,
    isAuthenticated,
    loading,
    user,
    error,
    register,
    login,
    logout,
    getUserRole,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
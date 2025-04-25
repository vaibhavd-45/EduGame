import React, { createContext, useState, useEffect } from 'react';
import api from '../config/axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load user on mount
  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setLoading(false);
          return;
        }

        const res = await api.get('/auth/me');
        setUser(res.data);
      } catch (err) {
        console.error('Error loading user:', err);
        localStorage.removeItem('token');
        setError(err.response?.data?.message || 'Authentication error');
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  // Register user
  const register = async (formData) => {
    try {
      setError(null);
      const res = await api.post('/auth/register', formData);
      localStorage.setItem('token', res.data.token);
      setUser(res.data.user);
      return res.data;
    } catch (err) {
      console.error('Registration error:', err);
      const errorMessage = err.response?.data?.message || 'Registration failed';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  // Login user
  const login = async (formData) => {
    try {
      setError(null);
      const res = await api.post('/auth/login', formData);
      localStorage.setItem('token', res.data.token);
      setUser(res.data.user);
      return res.data;
    } catch (err) {
      console.error('Login error:', err);
      const errorMessage = err.response?.data?.message || 'Login failed';
      setError(errorMessage);
      throw err;
    }
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setError(null);
  };

  // Clear error
  const clearError = () => {
    setError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        error,
        register,
        login,
        logout,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}; 
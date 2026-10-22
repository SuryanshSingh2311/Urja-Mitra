import { create } from 'zustand';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

export const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('urja_user')) || null,
  token: localStorage.getItem('urja_token') || null,
  isAuthenticated: !!localStorage.getItem('urja_token'),
  error: null,
  isLoading: false,

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const formData = new FormData();
      formData.append('username', email);
      formData.append('password', password);

      const response = await axios.post(`${API_BASE_URL}/auth/login`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      const { access_token, role } = response.data;
      const user = { email, role };

      localStorage.setItem('urja_token', access_token);
      localStorage.setItem('urja_user', JSON.stringify(user));

      set({ token: access_token, user, isAuthenticated: true, isLoading: false });
      return true;
    } catch (err) {
      set({ 
        error: err.response?.data?.detail || 'Login failed. Check your credentials.', 
        isLoading: false 
      });
      return false;
    }
  },

  signup: async (userData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/signup`, userData);
      const { access_token, role } = response.data;
      const user = { email: userData.email, role, fullName: userData.full_name };

      localStorage.setItem('urja_token', access_token);
      localStorage.setItem('urja_user', JSON.stringify(user));

      set({ token: access_token, user, isAuthenticated: true, isLoading: false });
      return true;
    } catch (err) {
      set({ 
        error: err.response?.data?.detail || 'Registration failed. Try again.', 
        isLoading: false 
      });
      return false;
    }
  },

  logout: () => {
    localStorage.removeItem('urja_token');
    localStorage.removeItem('urja_user');
    set({ token: null, user: null, isAuthenticated: false });
  }
}));
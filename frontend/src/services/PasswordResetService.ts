import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export const PasswordResetService = {
  forgotPassword: async (email: string) => {
    try {
      const response = await axios.post(`${API_URL}/api/auth/forgot-password`, { email });
      return response.data;
    } catch (error) {
      console.error('🔴 Forgot password error:', error);
      throw error;
    }
  },

  verifyToken: async (token: string) => {
    try {
      const response = await axios.get(`${API_URL}/api/auth/verify-token/${token}`);
      return response.data;
    } catch (error) {
      console.error('Verify token error:', error);
      throw error;
    }
  },

  resetPassword: async (token: string, newPassword: string) => {
    try {
      const response = await axios.post(`${API_URL}/api/auth/reset-password/${token}`, { newPassword });
      return response.data;
    } catch (error) {
      console.error('Reset password error:', error);
      throw error;
    }
  }
};

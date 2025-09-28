// src/apiService.js

import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api/auth',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const signupUser = (userData) => {
  return apiClient.post('/signup', userData);
};

// Add this function if it's not already there
export const loginUser = (credentials) => {
  return apiClient.post('/login', credentials);
};
// services/auth.service.ts
import axios from 'axios';

const API_URL = 'http://localhost:3000/auth';

export const login = async (email: string, password: string) => {
  const res = await axios.post(`${API_URL}/login`, { email, password });
  return res.data;
};

export const signup = async (username: string, email: string, password: string) => {
  const res = await axios.post(`${API_URL}/signup`, {
    username,
    email,
    password,
  });
  return res.data;
};

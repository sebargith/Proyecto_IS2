import { useState } from 'react';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:4000';     // backend

interface User { id: number; username: string }

export function useAuth() {
  const [user, setUser] = useState<User | null>(
    () => JSON.parse(localStorage.getItem('user') || 'null')
  );

  const register = async (username: string, password: string) => {
    await axios.post('/register', { username, password });
  };

  const login = async (username: string, password: string) => {
    const { data } = await axios.post<User>('/login', { username, password });
    localStorage.setItem('user', JSON.stringify(data));
    setUser(data);
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return { user, register, login, logout };
}

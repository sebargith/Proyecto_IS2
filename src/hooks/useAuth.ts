import { useState } from "react";
import axios from "axios";

interface User {
  username: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(() =>
    JSON.parse(localStorage.getItem("user") || "null")
  );
  const register = async (
    username: string,
    email: string,
    password: string,
    age: number
  ) => {
    await axios.post("/register", { username, email, password, age });
  };

  const login = async (email: string, password: string) => {
    const { data } = await axios.post<User>("/login", { email, password });
    localStorage.setItem("user", JSON.stringify(data));
    setUser(data);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return { user, register, login, logout };
}

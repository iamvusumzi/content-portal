import React, { useState, useEffect } from "react";
import { AuthContext } from "./authContextValue";
import { login as loginApi, register as registerApi } from "../api/authApi";
import { setAuthToken } from "../utils/axios";
import type {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
} from "../types/auth";
export interface AuthContextType {
  username: string | null;
  role: string | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (data: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest, isAdmin?: boolean) => Promise<void>;
  logout: () => void;
}
// AuthContext is defined in a separate file to keep this file exporting only components.
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [username, setUsername] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Load from localStorage on startup
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("username");
    const storedRole = localStorage.getItem("role");

    if (storedToken && storedUser && storedRole) {
      setToken(storedToken);
      setUsername(storedUser);
      setRole(storedRole);
      setAuthToken(storedToken);
    }
  }, []);

  const login = async (data: LoginRequest) => {
    const response: AuthResponse = await loginApi(data);
    setUsername(response.username);
    setRole(response.role);
    setToken(response.token);

    localStorage.setItem("username", response.username);
    localStorage.setItem("role", response.role);
    localStorage.setItem("token", response.token);

    setAuthToken(response.token);
  };

  const register = async (data: RegisterRequest, isAdmin = false) => {
    const response: AuthResponse = await registerApi(data, isAdmin);
    setUsername(response.username);
    setRole(response.role);
    setToken(response.token);

    localStorage.setItem("username", response.username);
    localStorage.setItem("role", response.role);
    localStorage.setItem("token", response.token);

    setAuthToken(response.token);
  };

  const logout = () => {
    setUsername(null);
    setRole(null);
    setToken(null);
    localStorage.clear();
    setAuthToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        username,
        role,
        token,
        isAuthenticated: !!token,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export { AuthContext };

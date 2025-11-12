import api from "../utils/axios";
import type {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
} from "../types/auth";

export const login = async (data: LoginRequest): Promise<AuthResponse> => {
  const response = await api.post("/auth/login", data);
  return response.data;
};

export const register = async (
  data: RegisterRequest,
  isAdmin: boolean = false
): Promise<AuthResponse> => {
  const endpoint = isAdmin ? "/auth/register/admin" : "/auth/register";

  const payload = {
    username: data.username,
    password: data.password,
    ...(isAdmin && { adminSecret: data.adminSecret }),
  };

  const response = await api.post(endpoint, payload);
  return response.data;
};

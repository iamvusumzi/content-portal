export interface LoginRequest {
  username: string;
  password: string;
}

export type RegisterRequest = LoginRequest & {
  adminSecret?: string;
};

export interface AuthResponse {
  token: string;
  username: string;
  role: "USER" | "ADMIN";
}

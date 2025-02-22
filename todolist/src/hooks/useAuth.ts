import { useMutation } from "@tanstack/react-query";

import { LoginData, RegisterData } from "@/schemas/authSchema";
import { Login, Register, Logout } from "@/services/authService";

export const login = () => {
  return useMutation({
    mutationFn: (data: LoginData) => Login(data),
  });
};

export const register = () => {
  return useMutation({
    mutationFn: (data: RegisterData) => Register(data),
  });
};

export const logout = () => {
  return useMutation({
    mutationFn: Logout,
  });
};

import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "O email é obrigatório")
    .email("Email inválido")
    .max(255, "O email tem que possuir menos caracteres, no máximo 255"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

export const registerSchema = z.object({
  name: z
    .string()
    .min(3, "O nome tem que possuir mais caracteres, no minímo 3")
    .max(100, "O nome tem que possuir menos caracteres, no máximo 100"),
  email: z
    .string()
    .min(1, "O email é obrigatório")
    .email("Email inválido")
    .max(255, "O email tem que possuir menos caracteres, no máximo 255"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

export type LoginData = z.infer<typeof loginSchema>;
export type RegistaData = z.infer<typeof registerSchema>;

import { z } from "zod"

const user = z.object({
  name: z
    .string({ message: "O nome de usuário deve ser uma string" })
    .min(8, { message: "A quantidade mínima de caracteres é 12" })
    .max(36, { message: "A quantidade máxima de caracteres é 36" }),

  email: z.email({ message: "O email deve ser válido" }),

  password: z
    .string({ message: "A senha deve ser uma string" })
    .min(8, { message: "A senha deve ter no mínimo 8 caracteres" })
    .regex(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula")
    .regex(/[0-9]/, "A senha deve conter pelo menos um número")
    .regex(/[^a-zA-Z0-9]/, "A senha deve conter pelo menos um caractere especial")
});

export const createUser = user;

export const updateUser = z.object({
    name: z
    .string({ message: "O nome de usuário deve ser uma string" })
    .min(8, { message: "A quantidade mínima de caracteres é 12" })
    .max(36, { message: "A quantidade máxima de caracteres é 36" }),
  password: z
    .string({ message: "A senha deve ser uma string" })
    .min(8, { message: "A senha deve ter no mínimo 8 caracteres" })
    .regex(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula")
    .regex(/[0-9]/, "A senha deve conter pelo menos um número")
    .regex(/[^a-zA-Z0-9]/, "A senha deve conter pelo menos um caractere especial")
}).partial();

export const userParams = z.object({
  email: z
    .email({ message: "O email deve ser válido" }),
});

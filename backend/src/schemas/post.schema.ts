import { z } from "zod";

export const StatusEnum = z.enum(["PUBLIC", "PRIVATE"]);

export const createPost = z.object({
  tittle: z
    .string({ message: "O título deve ser uma string" })
    .min(10, "O título deve posuir mais de 10 caracteres")
    .max(100, "O título pode ter no máximo 100 caracteres"),

  content: z
    .string({ message: "O conteúdo deve ser uma string" })
    .min(20, "O conteúdo deve ter no mínimo 10 caracteres"),

  status: StatusEnum,

  recipientEmail: z
    .email("O email do destinatário deve ser válido")
    .optional()
    .nullable(),
});

export const updatePost = z.object({
  tittle: z
    .string()
    .min(1, "O título deve ter ao menos 1 caractere")
    .max(100, "O título pode ter no máximo 100 caracteres")
    .optional(),

  content: z
    .string()
    .min(10, "O conteúdo deve ter ao menos 10 caracteres")
    .optional(),
});

export const postParams = z.object({
  idPost: z.string(),
});

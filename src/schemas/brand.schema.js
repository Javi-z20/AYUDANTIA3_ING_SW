import { z } from 'zod';

export const createBrandSchema = z.object({
  name: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(80, 'El nombre no puede superar los 80 caracteres')
    .trim(),

  country: z
    .string()
    .max(60, 'El país no puede superar los 60 caracteres')
    .optional(),

  website: z
    .string()
    .url('Debe ser una URL válida')
    .max(200, 'La URL no puede superar los 200 caracteres')
    .optional()
});

import { z } from 'zod';

// Esquema para crear una categoría (POST)
export const createCategorySchema = z.object({
  name: z
    .string({ required_error: 'El nombre de la categoría es obligatorio' })
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(80, 'El nombre no puede exceder los 80 caracteres')
    .trim(),
  description: z
    .string()
    .max(500, 'La descripción no puede superar los 500 caracteres')
    .optional()
});

// Esquema para actualizar una categoría (PUT / PATCH)
export const updateCategorySchema = createCategorySchema.partial();

// Esquema para validar parámetros numéricos en la URL (:id)
export const categoryIdParamSchema = z.object({
  id: z
    .string()
    .regex(/^\d+$/, 'El ID de la categoría debe ser un número entero')
    .transform(Number)
});

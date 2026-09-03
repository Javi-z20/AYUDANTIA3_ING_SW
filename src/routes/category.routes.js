import { Router } from 'express';
import {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
} from '../controllers/category.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import {
  createCategorySchema,
  updateCategorySchema,
  categoryIdParamSchema
} from '../schemas/category.schema.js';

const router = Router();

// Endpoints de Categorías
router.get('/', getAllCategories);
router.get('/:id', validate(categoryIdParamSchema, 'params'), getCategoryById);
router.post('/', validate(createCategorySchema, 'body'), createCategory);
router.put('/:id', validate(categoryIdParamSchema, 'params'), validate(updateCategorySchema, 'body'), updateCategory);
router.delete('/:id', validate(categoryIdParamSchema, 'params'), deleteCategory);

export default router;

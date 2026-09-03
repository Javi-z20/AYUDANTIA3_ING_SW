import prisma from '../config/prisma.js';

/**
 * Obtener todas las categorías incluyendo el conteo de productos
 * GET /api/categories
 */
export const getAllCategories = async (req, res, next) => {
  try {
    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: { products: true } // Cantidad de productos en esta categoría
        }
      },
      orderBy: {
        name: 'asc'
      }
    });

    res.status(200).json({
      total: categories.length,
      data: categories
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Obtener una categoría por ID con sus productos
 * GET /api/categories/:id
 */
export const getCategoryById = async (req, res, next) => {
  try {
    const categoryId = Number(req.params.id);

    const category = await prisma.category.findUnique({
      where: { id: categoryId },
      include: {
        products: {
          select: {
            id: true,
            name: true,
            price: true,
            stock: true,
            sku: true,
            isAvailable: true
          }
        }
      }
    });

    if (!category) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }

    res.status(200).json(category);
  } catch (error) {
    next(error);
  }
};

/**
 * Crear una nueva categoría
 * POST /api/categories
 */
export const createCategory = async (req, res, next) => {
  try {
    const { name, description } = req.body;

    const newCategory = await prisma.category.create({
      data: {
        name,
        description
      }
    });

    res.status(201).json({
      mensaje: 'Categoría creada exitosamente',
      data: newCategory
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Actualizar una categoría existente
 * PUT /api/categories/:id
 */
export const updateCategory = async (req, res, next) => {
  try {
    const categoryId = Number(req.params.id);
    const { name, description } = req.body;

    const updatedCategory = await prisma.category.update({
      where: { id: categoryId },
      data: {
        name,
        description
      }
    });

    res.status(200).json({
      mensaje: 'Categoría actualizada exitosamente',
      data: updatedCategory
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Eliminar una categoría
 * DELETE /api/categories/:id
 */
export const deleteCategory = async (req, res, next) => {
  try {
    const categoryId = Number(req.params.id);

    // Verificar si la categoría tiene productos asociados
    const count = await prisma.product.count({
      where: { categoryId }
    });

    if (count > 0) {
      return res.status(400).json({
        error: `No se puede eliminar la categoría porque tiene ${count} producto(s) asociado(s).`
      });
    }

    await prisma.category.delete({
      where: { id: categoryId }
    });

    res.status(200).json({
      mensaje: 'Categoría eliminada exitosamente'
    });
  } catch (error) {
    next(error);
  }
};

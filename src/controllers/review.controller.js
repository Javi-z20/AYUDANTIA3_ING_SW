import prisma from '../config/prisma.js';

// GET /api/products/:id/reviews
export const getProductReviews = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Verificar que el producto existe
    const product = await prisma.product.findUnique({
      where: {
        id: Number(id)
      }
    });

    if (!product) {
      return res.status(404).json({
        error: 'Producto no encontrado'
      });
    }

    // Obtener las reseñas del producto
    const reviews = await prisma.review.findMany({
      where: {
        productId: Number(id)
      },
      orderBy: {
        id: 'desc'
      }
    });

    // Calcular promedio
    const averageRating =
      reviews.length > 0
        ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
        : 0;

    res.status(200).json({
      productId: Number(id),
      reviews,
      averageRating: Number(averageRating.toFixed(2))
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/products/:id/reviews
export const createProductReview = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { author, rating, comment } = req.body;

    // Verificar que el producto existe
    const product = await prisma.product.findUnique({
      where: {
        id: Number(id)
      }
    });

    if (!product) {
      return res.status(404).json({
        error: 'Producto no encontrado'
      });
    }

    // Crear la reseña
    const review = await prisma.review.create({
      data: {
        author,
        rating,
        comment,
        productId: Number(id)
      }
    });

    res.status(201).json(review);
  } catch (error) {
    next(error);
  }
};
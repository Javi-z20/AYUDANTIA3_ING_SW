import prisma from '../config/prisma.js';

// GET /api/brands
export const getAllBrands = async (req, res, next) => {
  try {
    const brands = await prisma.brand.findMany({
      include: {
        _count: {
          select: {
            products: true
          }
        }
      },
      orderBy: {
        name: 'asc'
      }
    });

    res.status(200).json(brands);
  } catch (error) {
    next(error);
  }
};

// POST /api/brands
export const createBrand = async (req, res, next) => {
  try {
    const { name, country, website } = req.body;

    const brand = await prisma.brand.create({
      data: {
        name,
        country,
        website
      }
    });

    res.status(201).json(brand);
  } catch (error) {
    next(error);
  }
};

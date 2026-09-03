import { Router } from 'express';

import {
  getProductReviews,
  createProductReview
} from '../controllers/review.controller.js';

import { validate } from '../middlewares/validate.middleware.js';

import { createReviewSchema } from '../schemas/review.schema.js';

const router = Router();

router.get('/:id/reviews', getProductReviews);

router.post(
  '/:id/reviews',
  validate(createReviewSchema, 'body'),
  createProductReview
);

export default router;
import { Router } from 'express';
import { createReview, deleteReview, getProductReviews } from '../controllers/review.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = Router();
router.post('/', protect, createReview);
router.get('/product/:id', getProductReviews);
router.delete('/:id', protect, deleteReview);

export default router;

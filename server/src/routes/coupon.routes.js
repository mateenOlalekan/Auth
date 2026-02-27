import { Router } from 'express';
import { applyCoupon, createCoupon, deleteCoupon } from '../controllers/coupon.controller.js';
import { protect, restrictTo } from '../middlewares/auth.middleware.js';

const router = Router();
router.post('/', protect, restrictTo('ADMIN', 'SUPER_ADMIN'), createCoupon);
router.post('/apply', applyCoupon);
router.delete('/:id', protect, restrictTo('ADMIN', 'SUPER_ADMIN'), deleteCoupon);

export default router;

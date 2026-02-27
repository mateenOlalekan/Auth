import { Router } from 'express';
import { createOrder, getMyOrders, getOrders, updateOrderStatus } from '../controllers/order.controller.js';
import { protect, restrictTo } from '../middlewares/auth.middleware.js';

const router = Router();
router.use(protect);
router.post('/', createOrder);
router.get('/my-orders', getMyOrders);
router.get('/', restrictTo('ADMIN', 'SUPER_ADMIN'), getOrders);
router.patch('/:id/status', restrictTo('ADMIN', 'SUPER_ADMIN'), updateOrderStatus);

export default router;

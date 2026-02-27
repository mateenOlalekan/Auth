import { Router } from 'express';
import { addToCart, clearCart, getCart, removeFromCart, updateCart } from '../controllers/cart.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = Router();
router.use(protect);
router.get('/', getCart);
router.post('/', addToCart);
router.patch('/update', updateCart);
router.delete('/remove/:productId', removeFromCart);
router.delete('/clear', clearCart);

export default router;

import { Router } from 'express';
import { createProduct, deleteProduct, getProductById, getProducts, updateProduct } from '../controllers/product.controller.js';
import { protect, restrictTo } from '../middlewares/auth.middleware.js';

const router = Router();
router.route('/').post(protect, restrictTo('ADMIN', 'SUPER_ADMIN'), createProduct).get(getProducts);
router.route('/:id').get(getProductById).patch(protect, restrictTo('ADMIN', 'SUPER_ADMIN'), updateProduct).delete(protect, restrictTo('ADMIN', 'SUPER_ADMIN'), deleteProduct);

export default router;

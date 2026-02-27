import { Router } from 'express';
import { createCategory, deleteCategory, getCategories, updateCategory } from '../controllers/category.controller.js';
import { protect, restrictTo } from '../middlewares/auth.middleware.js';

const router = Router();
router.route('/').post(protect, restrictTo('ADMIN', 'SUPER_ADMIN'), createCategory).get(getCategories);
router.route('/:id').patch(protect, restrictTo('ADMIN', 'SUPER_ADMIN'), updateCategory).delete(protect, restrictTo('ADMIN', 'SUPER_ADMIN'), deleteCategory);
export default router;

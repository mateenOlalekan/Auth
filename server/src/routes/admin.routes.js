import { Router } from 'express';
import { dashboard } from '../controllers/admin.controller.js';
import { protect, restrictTo } from '../middlewares/auth.middleware.js';

const router = Router();
router.get('/dashboard', protect, restrictTo('ADMIN', 'SUPER_ADMIN'), dashboard);

export default router;

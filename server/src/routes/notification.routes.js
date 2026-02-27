import { Router } from 'express';
import { getAllNotifications, getUserNotifications } from '../controllers/notification.controller.js';
import { protect, restrictTo } from '../middlewares/auth.middleware.js';

const router = Router();
router.get('/getall', protect, restrictTo('ADMIN', 'SUPER_ADMIN'), getAllNotifications);
router.get('/getusernotification', protect, getUserNotifications);

export default router;

import { Router } from 'express';
import { getMe, getOtp, login, logout, refresh, register, verifyOtp } from '../controllers/auth.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = Router();
router.post('/register', register);
router.post('/login', login);
router.post('/refresh', refresh);
router.post('/logout', logout);
router.post('/otp', getOtp);
router.post('/verify-otp', verifyOtp);
router.get('/me', protect, getMe);

export default router;

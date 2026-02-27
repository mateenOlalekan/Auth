import { Router } from 'express';
import { createPaymentIntent, paymentWebhook } from '../controllers/payment.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = Router();
router.post('/create-intent', protect, createPaymentIntent);
router.post('/webhook', paymentWebhook);

export default router;

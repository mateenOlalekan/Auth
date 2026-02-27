import { Order } from '../models/order.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { stripe } from '../services/payment.service.js';

export const createPaymentIntent = asyncHandler(async (req, res) => {
  const { amount, currency = 'usd' } = req.body;
  const intent = await stripe.paymentIntents.create({ amount, currency });
  res.json({ success: true, clientSecret: intent.client_secret });
});

export const paymentWebhook = asyncHandler(async (req, res) => {
  const { orderId, status } = req.body;
  if (orderId) await Order.findByIdAndUpdate(orderId, { paymentStatus: status === 'succeeded' ? 'Paid' : 'Failed', orderStatus: status === 'succeeded' ? 'Paid' : 'Pending' });
  res.json({ received: true });
});

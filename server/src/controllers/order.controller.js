import mongoose from 'mongoose';
import { Cart } from '../models/cart.model.js';
import { Order } from '../models/order.model.js';
import { Product } from '../models/product.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const createOrder = asyncHandler(async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  const cart = await Cart.findOne({ user: req.user._id }).populate('products.product').session(session);

  const orderItems = cart.products.map((p) => ({ product: p.product._id, quantity: p.quantity, price: p.product.price }));
  const totalPrice = orderItems.reduce((sum, i) => sum + i.price * i.quantity, 0);

  for (const item of cart.products) {
    await Product.findByIdAndUpdate(item.product._id, { $inc: { stock: -item.quantity } }, { session });
  }

  const order = await Order.create([{ user: req.user._id, orderItems, totalPrice, shippingAddress: req.body.shippingAddress, paymentMethod: req.body.paymentMethod }], { session });
  cart.products = [];
  cart.totalPrice = 0;
  await cart.save({ session });

  await session.commitTransaction();
  res.status(201).json({ success: true, order: order[0] });
});

export const getMyOrders = asyncHandler(async (req, res) => res.json({ success: true, orders: await Order.find({ user: req.user._id }) }));
export const getOrders = asyncHandler(async (_req, res) => res.json({ success: true, orders: await Order.find().populate('user') }));
export const updateOrderStatus = asyncHandler(async (req, res) => res.json({ success: true, order: await Order.findByIdAndUpdate(req.params.id, { orderStatus: req.body.orderStatus }, { new: true }) }));

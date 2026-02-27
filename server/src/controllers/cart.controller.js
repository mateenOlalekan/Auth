import { Cart } from '../models/cart.model.js';
import { Product } from '../models/product.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const recalculate = async (cart) => {
  await cart.populate('products.product');
  cart.totalPrice = cart.products.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  return cart.save();
};

export const getCart = asyncHandler(async (req, res) => {
  const cart = (await Cart.findOne({ user: req.user._id }).populate('products.product')) || { products: [], totalPrice: 0 };
  res.json({ success: true, cart });
});

export const addToCart = asyncHandler(async (req, res) => {
  const { product, quantity = 1 } = req.body;
  await Product.findById(product);
  const cart = (await Cart.findOne({ user: req.user._id })) || (await Cart.create({ user: req.user._id, products: [] }));
  const existing = cart.products.find((p) => p.product.toString() === product);
  if (existing) existing.quantity += quantity;
  else cart.products.push({ product, quantity });
  await recalculate(cart);
  res.status(201).json({ success: true, cart });
});

export const updateCart = asyncHandler(async (req, res) => {
  const { product, quantity } = req.body;
  const cart = await Cart.findOne({ user: req.user._id });
  const item = cart.products.find((p) => p.product.toString() === product);
  if (item) item.quantity = quantity;
  await recalculate(cart);
  res.json({ success: true, cart });
});

export const removeFromCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id });
  cart.products = cart.products.filter((p) => p.product.toString() !== req.params.productId);
  await recalculate(cart);
  res.json({ success: true, cart });
});

export const clearCart = asyncHandler(async (req, res) => {
  await Cart.findOneAndUpdate({ user: req.user._id }, { products: [], totalPrice: 0 });
  res.json({ success: true });
});

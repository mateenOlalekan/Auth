import { Product } from '../models/product.model.js';
import { APIFeatures } from '../utils/apiFeatures.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const createProduct = asyncHandler(async (req, res) => {
  const product = await Product.create({ ...req.body, createdBy: req.user._id });
  res.status(201).json({ success: true, product });
});

export const getProducts = asyncHandler(async (req, res) => {
  const features = new APIFeatures(Product.find({ isDeleted: false }), req.query).filter().search(['name', 'description', 'brand']).sort().paginate();
  const products = await features.query.populate('category');
  res.json({ success: true, results: products.length, products });
});

export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.json({ success: true, product });
});

export const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json({ success: true, product });
});

export const deleteProduct = asyncHandler(async (req, res) => {
  await Product.findByIdAndUpdate(req.params.id, { isDeleted: true });
  res.json({ success: true });
});

import { Category } from '../models/category.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const createCategory = asyncHandler(async (req, res) => res.status(201).json({ success: true, category: await Category.create(req.body) }));
export const getCategories = asyncHandler(async (_req, res) => res.json({ success: true, categories: await Category.find({ isDeleted: false }) }));
export const updateCategory = asyncHandler(async (req, res) => res.json({ success: true, category: await Category.findByIdAndUpdate(req.params.id, req.body, { new: true }) }));
export const deleteCategory = asyncHandler(async (req, res) => {
  await Category.findByIdAndUpdate(req.params.id, { isDeleted: true });
  res.json({ success: true });
});

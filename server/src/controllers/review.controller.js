import { Review } from '../models/review.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const createReview = asyncHandler(async (req, res) => {
  const review = await Review.create({ ...req.body, user: req.user._id });
  res.status(201).json({ success: true, review });
});

export const getProductReviews = asyncHandler(async (req, res) => res.json({ success: true, reviews: await Review.find({ product: req.params.id }).populate('user', 'name') }));
export const deleteReview = asyncHandler(async (req, res) => {
  await Review.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

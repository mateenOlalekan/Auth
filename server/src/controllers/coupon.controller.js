import { Coupon } from '../models/coupon.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const createCoupon = asyncHandler(async (req, res) => res.status(201).json({ success: true, coupon: await Coupon.create(req.body) }));
export const applyCoupon = asyncHandler(async (req, res) => {
  const coupon = await Coupon.findOne({ code: req.body.code.toUpperCase() });
  const valid = coupon && coupon.expiresAt > new Date();
  res.json({ success: true, valid, discountPercentage: valid ? coupon.discountPercentage : 0 });
});
export const deleteCoupon = asyncHandler(async (req, res) => {
  await Coupon.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

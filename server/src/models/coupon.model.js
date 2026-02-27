import mongoose from 'mongoose';

const couponSchema = new mongoose.Schema({
  code: { type: String, unique: true, uppercase: true },
  discountPercentage: { type: Number, min: 1, max: 90 },
  expiresAt: Date,
  usageLimit: Number,
}, { timestamps: true });

export const Coupon = mongoose.model('Coupon', couponSchema);

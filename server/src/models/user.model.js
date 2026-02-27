import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import validator from 'validator';

const addressSchema = new mongoose.Schema(
  {
    line1: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    zipCode: { type: String, required: true },
  },
  { _id: true }
);

const refreshTokenSchema = new mongoose.Schema(
  {
    token: String,
    expiresAt: Date,
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, lowercase: true, required: true, validate: [validator.isEmail, 'Invalid email'] },
    password: { type: String, required: true, minlength: 8, select: false },
    role: { type: String, enum: ['USER', 'ADMIN', 'SUPER_ADMIN'], default: 'USER' },
    refreshTokens: [refreshTokenSchema],
    otpCode: String,
    otpExpiresAt: Date,
    addresses: [addressSchema],
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

userSchema.pre('save', async function hashPassword(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = function comparePassword(password) {
  return bcrypt.compare(password, this.password);
};

export const User = mongoose.model('User', userSchema);

import crypto from 'crypto';
import { User } from '../models/user.model.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../services/token.service.js';

const buildAuthPayload = (user) => ({
  user: { id: user._id, name: user.name, email: user.email, role: user.role },
  accessToken: signAccessToken(user),
});

export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) throw new ApiError(400, 'Missing required fields');
  if (await User.findOne({ email })) throw new ApiError(409, 'Email already in use');
  const user = await User.create({ name, email, password });
  res.status(201).json({ success: true, ...buildAuthPayload(user) });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.comparePassword(password))) throw new ApiError(401, 'Invalid credentials');

  const refreshToken = signRefreshToken(user);
  user.refreshTokens.push({ token: refreshToken, expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) });
  await user.save();

  res
    .cookie('refreshToken', refreshToken, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict' })
    .json({ success: true, ...buildAuthPayload(user), refreshToken });
});

export const refresh = asyncHandler(async (req, res) => {
  const token = req.body.refreshToken || req.cookies.refreshToken;
  if (!token) throw new ApiError(401, 'Refresh token missing');
  const payload = verifyRefreshToken(token);
  const user = await User.findById(payload.sub);
  if (!user || !user.refreshTokens.some((item) => item.token === token)) throw new ApiError(401, 'Invalid refresh token');
  user.refreshTokens = user.refreshTokens.filter((item) => item.token !== token);
  const rotated = signRefreshToken(user);
  user.refreshTokens.push({ token: rotated, expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) });
  await user.save();
  res.json({ success: true, ...buildAuthPayload(user), refreshToken: rotated });
});

export const logout = asyncHandler(async (req, res) => {
  const token = req.body.refreshToken || req.cookies.refreshToken;
  if (token) {
    const payload = verifyRefreshToken(token);
    await User.findByIdAndUpdate(payload.sub, { $pull: { refreshTokens: { token } } });
  }
  res.clearCookie('refreshToken').json({ success: true, message: 'Logged out' });
});

export const getMe = asyncHandler(async (req, res) => {
  res.json({ success: true, user: req.user });
});

export const getOtp = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw new ApiError(404, 'User not found');
  user.otpCode = crypto.randomInt(100000, 999999).toString();
  user.otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);
  await user.save();
  res.json({ success: true, message: 'OTP generated', otp: user.otpCode });
});

export const verifyOtp = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;
  const user = await User.findOne({ email });
  if (!user || user.otpCode !== otp || user.otpExpiresAt < new Date()) throw new ApiError(400, 'Invalid or expired OTP');
  user.otpCode = undefined;
  user.otpExpiresAt = undefined;
  await user.save();
  res.json({ success: true, message: 'OTP verified' });
});

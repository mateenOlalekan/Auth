import { Notification } from '../models/notification.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getAllNotifications = asyncHandler(async (_req, res) => {
  const notifications = await Notification.find().populate('user', 'name email');
  res.json({ success: true, notifications });
});

export const getUserNotifications = asyncHandler(async (req, res) => {
  const notifications = await Notification.find({ user: req.user._id });
  res.json({ success: true, notifications });
});

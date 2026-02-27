import { User } from '../models/user.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const addAddress = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(req.user._id, { $push: { addresses: req.body } }, { new: true });
  res.status(201).json({ success: true, addresses: user.addresses });
});

export const getAddresses = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  res.json({ success: true, addresses: user.addresses });
});

export const deleteAddress = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(req.user._id, { $pull: { addresses: { _id: req.params.id } } }, { new: true });
  res.json({ success: true, addresses: user.addresses });
});

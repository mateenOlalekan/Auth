import { User } from '../models/user.model.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { verifyAccessToken } from '../services/token.service.js';

export const protect = asyncHandler(async (req, _res, next) => {
  const auth = req.headers.authorization;
  if (!auth?.startsWith('Bearer ')) throw new ApiError(401, 'Unauthorized');
  const payload = verifyAccessToken(auth.split(' ')[1]);
  const user = await User.findById(payload.sub);
  if (!user || user.isDeleted) throw new ApiError(401, 'Invalid user');
  req.user = user;
  next();
});

export const restrictTo = (...roles) => (req, _res, next) => {
  if (!roles.includes(req.user.role)) throw new ApiError(403, 'Forbidden');
  next();
};

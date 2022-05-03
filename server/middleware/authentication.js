import mongoose from 'mongoose';
import { UserSchema } from '../models/User.js';
const User = mongoose.model('User', UserSchema);

export const authenticate = async (req, res, next) => {
  const { sessionid } = req.headers;
  if (!sessionid || !mongoose.isValidObjectId(sessionid)) return next();
  const user = await User.findOne({ 'sessions._id': sessionid });
  if (!user) return next();
  req.user = user;
  return next();
};

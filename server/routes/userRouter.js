import { json, Router } from 'express';
export const userRouter = Router();
import mongoose from 'mongoose';
import { UserSchema } from '../models/User.js';
const User = mongoose.model('User', UserSchema);
import bcrypt from 'bcryptjs';

userRouter.post('/register', async (req, res) => {
  try {
    if (req.body.hashedPassword.length < 6) throw new Error('비밀번호를 6자 이상 입력 해주세요');
    if (req.body.username.length < 3) throw new Error('username은 3자 이상 입력해 주세요.');
    const hashedPassword = await bcrypt.hash(req.body.hashedPassword, 10);
    const user = await new User({
      name: req.body.name,
      username: req.body.username,
      hashedPassword,
      sessions: [{ createdAt: new Date() }],
    }).save();
    const session = user.sessions[0];
    res.json({
      message: 'user registered',
      sessionId: session._id,
      name: user.name,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

userRouter.patch('/login', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    const isValid = await bcrypt.compare(req.body.hashedPassword, user.hashedPassword);
    if (!isValid) throw new Error('입력하신 정보가 올바르지 않습니다.');
    user.sessions.push({ createdAt: new Date() });
    const session = user.sessions[user.sessions.length - 1]; // 마지막 요소
    await user.save();
    res.json({
      message: 'user validated',
      sessionId: session._id,
      name: user.name,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

userRouter.patch('/logout', async (req, res) => {
  try {
    // const { sessionid } = req.headers;
    // if (!mongoose.isValidObjectId(sessionid)) throw new Error('invalid sessionid!');
    // const user = await User.findOne({ 'sessions._id': sessionid });
    // if (!user) throw new Error('invalid sessionid');
    // 미들웨어 적용
    if (!req.user) throw new Error('invalid sessionid...');

    // 로그아웃 처리
    await User.updateOne({ _id: req.user.id }, { $pull: { sessions: { _id: req.headers.sessionid } } });
    res.json({ message: 'user is logged out' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

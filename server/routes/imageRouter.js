import { Router } from 'express';
import { ImgSchema } from '../models/Image.js';
import mongoose from 'mongoose';
const Img = mongoose.model('Image', ImgSchema);
export const imageRouter = Router();
import { upload } from '../middleware/imageUpload.js';

// 이미지 저장
imageRouter.post('/', upload.single('image'), async (req, res) => {
  const image = await new Img({ key: req.file.filename, originalFileName: req.file.originalname }).save();
  res.json(image);
});

// 이미지 불러오기
imageRouter.get('/', upload.single('image'), async (req, res) => {
  const images = await Img.find();
  res.json(images);
});

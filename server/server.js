import 'dotenv/config';
import express from 'express';
import multer from 'multer';
import { v4 as uuid } from 'uuid';
import mime from 'mime-types';
import cors from 'cors';
import mongoose from 'mongoose';
import { ImgSchema } from './models/Image.js';
const Img = mongoose.model('Image', ImgSchema);

// DB 연결 후 server 연결
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('mongodb connected');
    app.use('/images', express.static('uploads'));

    // 이미지 저장
    app.post('/images', upload.single('image'), async (req, res) => {
      const image = await new Img({ key: req.file.filename, originalFileName: req.file.originalname }).save();
      res.json(image);
    });

    // 이미지 불러오기
    app.get('/images', upload.single('image'), async (req, res) => {
      const images = await Img.find();
      res.json(images);
    });

    app.listen(PORT, () => {
      console.log('express server listening on PORT: ' + PORT);
    });
  });

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, './uploads'),
  filename: (req, file, cb) => cb(null, `${uuid()}.${mime.extension(file.mimetype)}`),
});
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (['image/jpeg', 'image/png'].includes(file.mimetype)) cb(null, true);
    else cb(new Error('잘못된 타입입니다.').message, false);
  },
  limits: {
    fileSize: 1024 * 1024 * 10,
  },
});

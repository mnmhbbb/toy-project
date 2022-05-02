import express from 'express';
import multer from 'multer';
import { v4 as uuid } from 'uuid';
import mime from 'mime-types';

const app = express();
const PORT = process.env.PORT || 5000;

app.use('/uploads', express.static('uploads'));

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
    fileSize: 1024 * 1024 * 5,
  },
});

app.post('/upload', upload.single('image'), (req, res) => {
  console.log(req.file);
  res.json(req.file);
});

app.listen(PORT, () => console.log('express server listening on PORT ' + PORT));

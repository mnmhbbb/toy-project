import multer from 'multer';
import { v4 as uuid } from 'uuid';
import mime from 'mime-types';

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, './uploads'),
  filename: (req, file, cb) => cb(null, `${uuid()}.${mime.extension(file.mimetype)}`),
});
export const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (['image/jpeg', 'image/png'].includes(file.mimetype)) cb(null, true);
    else cb(new Error('잘못된 타입입니다.').message, false);
  },
  limits: {
    fileSize: 1024 * 1024 * 10,
  },
});

import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { imageRouter } from './routes/imageRouter.js';

const app = express();
const { MONGO_URI, PORT } = process.env;

// DB 연결 후 server 연결
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('mongodb connected');
    app.use('/images', express.static('uploads'));
    app.use('/images', imageRouter);
    app.listen(PORT, () => {
      console.log('express server listening on PORT: ' + PORT);
    });
  });

app.use(cors());

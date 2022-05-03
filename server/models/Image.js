import mongoose from 'mongoose';

// 몽구스 검증
// 몽구스 자동 생성 _id: mysql의 primary key처럼 고유 키
// 각 이미지의 key
// 이미지 이름
// 이미지가 저장된 시간

export const ImgSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
    },
    originalFileName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// module.exports = mongoose.model('Image', ImgSchema);

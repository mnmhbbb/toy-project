import React, { useContext } from 'react';
import { ImgContext } from '../context/ImgContext';

const ImageList = () => {
  const [imgs] = useContext(ImgContext);
  const imgList = imgs.map((img) => (
    <img key={img.key} alt={img._id} style={{ width: '100%' }} src={`http://localhost:5000/images/${img.key}`} />
  ));
  return (
    <>
      <h1>저장된 이미지 목록</h1>
      {imgList}
    </>
  );
};

export default ImageList;

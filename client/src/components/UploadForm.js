import React, { useState, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Progressbar from './Progressbar';
import { UploadFormStyle } from './UploadForm.style.js';
import { ImgContext } from '../context/ImgContext';

const UploadForm = () => {
  const [imgs, setImgs] = useContext(ImgContext);
  const [file, setFile] = useState(null);
  const defaultName = '이미지 첨부하기';
  const [fileText, setFileText] = useState(defaultName);
  const [imgSrc, setImgSrc] = useState(null);
  const [percent, setPercent] = useState(0);

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', file);

    // 이미지 전송
    try {
      const res = await axios.post('http://localhost:5000/images', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        // axios 제공 메서드
        onUploadProgress: (e) => {
          setPercent(Math.round((e.loaded / e.total) * 100));
        },
      });
      setImgs([...imgs, res.data]);
      toast.success('업로드 성공!');
      setTimeout(() => {
        setPercent(0);
        setFileText(defaultName);
        setImgSrc(null);
      }, 2000);
    } catch (err) {
      toast.error('업로드 실패');
      setImgSrc(null);
    }
  };

  const imgSelectHandler = (e) => {
    const imgFile = e.target.files[0];
    setFileText(imgFile.name);
    setFile(imgFile);

    // 이미지 파일 읽어오기
    const fileReader = new FileReader();
    fileReader.readAsDataURL(imgFile);
    fileReader.onload = (e) => setImgSrc(e.target.result);
  };

  return (
    <UploadFormStyle>
      <Progressbar percent={percent} />
      <img className={`img_preview ${imgSrc && 'img_preview_show'}`} src={imgSrc} alt='이미지 미리보기' />
      <form onSubmit={onSubmit}>
        <div className='file-dropper'>
          {fileText}
          <input id='img' type='file' accept='image/*' onChange={imgSelectHandler} />
        </div>
        <button style={{ marginTop: '20px', width: '100%' }}>제출</button>
      </form>
    </UploadFormStyle>
  );
};

export default UploadForm;

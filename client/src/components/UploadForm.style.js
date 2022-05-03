import styled from 'styled-components';
export const UploadFormStyle = styled.div`
  height: 100%;
  background-color: #fff;
  max-width: 500px;
  margin: 0 auto;

  & .img_preview {
    max-width: 200px;
    max-height: 200px;
    width: 0;
    opacity: 0;
    margin: 20px auto;
    border: 1px solid #aaa;
    background-color: #fff;
    display: block;
  }

  & .img_preview_show {
    width: 100%;
    transition: 0.5s ease;
    opacity: 1;
  }

  & .file-dropper {
    border: 1px solid #aaa;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #e5e5e5;
    position: relative;
  }

  & .file-dropper input {
    position: absolute;
    opacity: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }

  & .file-dropper:hover {
    background-color: #fff;
    transition: 0.5s;
  }
`;

import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const ImgContext = createContext();

export const ImgProvider = (prop) => {
  const [imgs, setImgs] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/images')
      .then((result) => setImgs(result.data))
      .catch((err) => console.error(err));
  }, []);
  return <ImgContext.Provider value={[imgs, setImgs]}>{prop.children}</ImgContext.Provider>;
};

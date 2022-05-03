import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ImgProvider } from './context/ImgContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ImgProvider>
      <App />
    </ImgProvider>
  </React.StrictMode>
);

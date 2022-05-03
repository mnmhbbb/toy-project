import React from 'react';
import './Progressbar.css';

const Progressbar = ({ percent }) => {
  return (
    <div>
      <div className='bar_container'>
        <div className='bar' style={{ width: `${percent}%` }}></div>
        <span className='bar_text'>{percent}%</span>
      </div>
    </div>
  );
};

export default Progressbar;

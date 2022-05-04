import React from 'react';

const CustomInput = ({ label, value, setValue, type = 'text' }) => {
  return (
    <div>
      <label>{label}</label>
      <input value={value} onChange={(e) => setValue(e.target.value)} type={type} />
    </div>
  );
};

export default CustomInput;

import { useState } from "react";

export const Input = ({ placeholder, type, onChange }) => {
  const onInputChange = (event) => {
    onChange && onChange(event.target.value);
  };

  return <input type={type} placeholder={placeholder} onChange={onInputChange} />;
};

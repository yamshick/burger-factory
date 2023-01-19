import { useState } from "react";

export const Input = ({ placeholder, onChange }) => {
  const onInputChange = (event) => {
    onChange && onChange(event.target.value);
  };

  return <input placeholder={placeholder} onChange={onInputChange} />;
};

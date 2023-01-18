import { useState } from "react";

export const CreateBlockInput = ({ onEnter }) => {
  const [value, setValue] = useState("");

  const onKeyDown = (event) => {
    if (event.key === "Enter") {
      onEnter(event.target.value);
      setValue("");
    }
  };
  const onChange = (event) => setValue(event.target.value);

  return <input onKeyDown={onKeyDown} value={value} onChange={onChange} />;
};

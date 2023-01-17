import Chevron from "./chevron.svg";
import { useState } from "react";

export const Dropdown = ({ header, items, onSelectItem }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = (e) => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <Chevron onClick={toggleOpen} />
      {header}
      {isOpen && (
        <ul>
          {items?.map((item) => (
            <li key={item} onClick={onSelectItem}>
              {item}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

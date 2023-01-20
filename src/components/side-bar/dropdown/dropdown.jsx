import Chevron from "../../../assets/icons/chevron.svg";
import { useState } from "react";
import { dropDownItemsMap, dropDownSubItemsMap } from "../constants";

export const Dropdown = ({ header, subItems, onSelectSubItem }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = (e) => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <Chevron onClick={toggleOpen} />
      {dropDownItemsMap[header]}
      {isOpen && (
        <ul>
          {subItems?.map(({ id, name }) => (
            <li key={id} onClick={() => onSelectSubItem({ id, name })}>
              {dropDownSubItemsMap[name]}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

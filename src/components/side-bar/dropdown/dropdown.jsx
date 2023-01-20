import Chevron from "../../../assets/icons/chevron.svg";
import { useState } from "react";
import { dropDownItemsMap, dropDownSubItemsMap } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import { sideBarSlice } from "../../../store/reducers/side-bar-slice";

export const Dropdown = ({ name, id, snacks, onSelectSubItem }) => {
  const { dropDownOpenItems } = useSelector((state) => state.sideBarReducer);
  const { toggleDropDownActiveItem } = sideBarSlice.actions;
  const dispatch = useDispatch();
  const toggleOpen = (e) => {
    dispatch(toggleDropDownActiveItem({ name, snacks, id }));
  };

  const isOpen = dropDownOpenItems?.map(({ id }) => id).includes(id);
  return (
    <>
      <Chevron onClick={toggleOpen} />
      {dropDownItemsMap[name]}
      {isOpen && (
        <ul>
          {snacks?.map(({ id, name }) => (
            <li key={id} onClick={() => onSelectSubItem({ id, name })}>
              {dropDownSubItemsMap[name]}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

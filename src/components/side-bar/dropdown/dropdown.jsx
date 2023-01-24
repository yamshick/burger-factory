import Chevron from "../../../assets/icons/chevron-down.svg";
import { useState } from "react";
import { dropDownItemsMap, dropDownSubItemsMap } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import { sideBarSlice } from "../../../store/reducers/side-bar-slice";
import styles from "../side-bar.module.scss";
import { DropdownItem } from "./dropdown-item";
import { blocksSlice } from "../../../store/reducers/blocks-slice";

export const Dropdown = ({
  name,
  translation,
  id,
  snacks,
  onSelectSubItem,
}) => {
  const { dropDownOpenItems } = useSelector((state) => state.sideBarReducer);
  const { toggleDropDownActiveItem } = sideBarSlice.actions;
  const dispatch = useDispatch();
  const { resetCheckboxes } = blocksSlice.actions;
  const toggleOpen = (e) => {
    dispatch(toggleDropDownActiveItem({ name, translation, snacks, id }));
  };

  const isOpen = dropDownOpenItems?.map(({ id }) => id).includes(id);

  const onSelectDropdownItem = ({ id, name, translation }) => {
    onSelectSubItem({ id, name, translation });
    dispatch(resetCheckboxes());
  };

  return (
    <div>
      <div
        className={[styles.dropDownContainer, styles.clickIcon].join(" ")}
        onClick={toggleOpen}
      >
        <Chevron />
        <span className={styles.dropDownHeader}>{translation}</span>
      </div>
      {isOpen && snacks?.length ? (
        <ul className={styles.dropDownList}>
          {snacks?.map(({ id, name, translation }) => (
            <DropdownItem
              key={id}
              id={id}
              name={name}
              translation={translation}
              onSelectDropdownItem={onSelectDropdownItem}
            />
          ))}
        </ul>
      ) : null}
    </div>
  );
};

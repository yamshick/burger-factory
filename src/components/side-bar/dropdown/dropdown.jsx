import Chevron from "../../../assets/icons/chevron-down.svg";
import { useState } from "react";
import { dropDownItemsMap, dropDownSubItemsMap } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import { sideBarSlice } from "../../../store/reducers/side-bar-slice";
import styles from "../side-bar.module.scss";

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
  const toggleOpen = (e) => {
    dispatch(toggleDropDownActiveItem({ name, translation, snacks, id }));
  };

  const isOpen = dropDownOpenItems?.map(({ id }) => id).includes(id);
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
            <li
              className={styles.dropDownItem}
              key={id}
              onClick={() => onSelectSubItem({ id, name, translation })}
            >
              {translation}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

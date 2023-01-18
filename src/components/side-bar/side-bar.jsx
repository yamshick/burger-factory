import styles from "./side-bar.module.scss";
import Logo from "./logo.svg";
import ArrowRight from "./arrow-right.svg";
import ArrowLeft from "./arrow-left.svg";
import { useState } from "react";
import { Dropdown } from "./dropdown/dropdown";
import { useDispatch } from "react-redux";
import { sideBarSlice } from "../../store/reducers/side-bar-slice";

export const SideBar = () => {
  const dispatch = useDispatch();
  const { setDropDownActiveItem, setDropDownActiveSubItem } =
    sideBarSlice.actions;
  const [isOpen, setIsOpen] = useState(true);

  const toggleOpen = () => setIsOpen(!isOpen);

  if (!isOpen)
    return (
      <div className={styles.toggleIconWrapper}>
        <ArrowRight onClick={toggleOpen} />
      </div>
    );
  return (
    <div className={styles.sideBarWrapper}>
      <div className={styles.sideBarContainer}>
        <Logo />
        {/*eslint-ignore next-line*/}
        <div>Добро пожаловать в &quot;Фабрику бургеров&quot;</div>
        <div className={styles.toggleIconWrapper}>
          <ArrowLeft onClick={toggleOpen} />
        </div>
        <Dropdown
          header={"sandwiches"}
          subItems={[]}
          onSelectSubItem={(subItem) => {
            dispatch(setDropDownActiveItem("sandwiches"));
            dispatch(setDropDownActiveSubItem(subItem));
          }}
        />
        <Dropdown
          header={"burgers"}
          subItems={["classic", "cheeseBurger", "bigMac", "bigTasty"]}
          onSelectSubItem={(subItem) => {
            dispatch(setDropDownActiveItem("burgers"));
            dispatch(setDropDownActiveSubItem(subItem));
          }}
        />
        <Dropdown
          header={"baget"}
          subItems={["withHam", "withPastra", "garlic", "withPepperGrill"]}
          onSelectSubItem={(subItem) => {
            dispatch(setDropDownActiveItem("baget"));
            dispatch(setDropDownActiveSubItem(subItem));
          }}
        />
      </div>
    </div>
  );
};

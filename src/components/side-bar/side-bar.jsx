import styles from "./side-bar.module.scss";
import Logo from "../../assets/icons/logo.svg";
import ArrowRight from "../../assets/icons/arrow-right.svg";
import ArrowLeft from "../../assets/icons/arrow-left.svg";
import { Dropdown } from "./dropdown/dropdown";
import { useDispatch, useSelector } from "react-redux";
import { sideBarSlice } from "../../store/reducers/side-bar-slice";
import { snacksCategories } from "../../app-constants";
import {blocksSlice} from "../../store/reducers/blocks-slice";

export const SideBar = () => {
  const dispatch = useDispatch();
  const { setIsSideBarOpen, setDropDownActiveItem, setDropDownActiveSubItem } =
    sideBarSlice.actions;
  const { isSideBarOpen } = useSelector((state) => state.sideBarReducer);
  const toggleOpen = () => dispatch(setIsSideBarOpen(!isSideBarOpen));

  if (!isSideBarOpen)
    return (
      <div className={styles.sideBarWrapper}>
        <div className={styles.sideBarContainer}>
          <div className={styles.toggleIconWrapper}>
            <ArrowRight className={styles.clickIcon} onClick={toggleOpen} />
          </div>
        </div>
      </div>
    );

  return (
    <div className={styles.sideBarWrapper}>
      <div className={styles.sideBarContainer}>
        <div className={styles.logoContainer}>
          <Logo />
          <div>
            Добро пожаловать в <br /> &quot;Фабрику бургеров&quot;{" "}
          </div>
        </div>
        <div className={styles.toggleIconWrapper}>
          <ArrowLeft className={styles.clickIcon} onClick={toggleOpen} />
        </div>
        {snacksCategories.map(({ id, name, translation, snacks }) => (
          <Dropdown
            key={id}
            id={id}
            name={name}
            translation={translation}
            snacks={snacks}
            onSelectSubItem={(subItem) => {
              dispatch(setDropDownActiveItem({ id, name, snacks }));
              dispatch(setDropDownActiveSubItem(subItem));
            }}
          />
        ))}
      </div>
    </div>
  );
};

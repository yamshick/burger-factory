import styles from "./side-bar.module.scss";
import Logo from "../../assets/icons/logo.svg";
import ArrowRight from "../../assets/icons/arrow-right.svg";
import ArrowLeft from "../../assets/icons/arrow-left.svg";
import { Dropdown } from "./dropdown/dropdown";
import { useDispatch, useSelector } from "react-redux";
import { sideBarSlice } from "../../store/reducers/side-bar-slice";
import { snacksCategories } from "../../app-constants";

export const SideBar = () => {
  const dispatch = useDispatch();
  const { setIsSideBarOpen, setDropDownActiveItem, setDropDownActiveSubItem } =
    sideBarSlice.actions;
  const {isSideBarOpen} = useSelector((state) => state.sideBarReducer);
  console.log({isSideBarOpen})
  const toggleOpen = () => dispatch(setIsSideBarOpen(!isSideBarOpen));

  if (!isSideBarOpen)
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
        {snacksCategories.map(({ id, name, snacks }) => (
          <Dropdown
            key={id}
            header={name}
            subItems={snacks}
            onSelectSubItem={(subItem) => {
              dispatch(setDropDownActiveItem(name));
              dispatch(setDropDownActiveSubItem(subItem));
            }}
          />
        ))}
        {/*<Dropdown*/}
        {/*  header={"sandwiches"}*/}
        {/*  subItems={[]}*/}
        {/*  onSelectSubItem={(subItem) => {*/}
        {/*    dispatch(setDropDownActiveItem("sandwiches"));*/}
        {/*    dispatch(setDropDownActiveSubItem(subItem));*/}
        {/*  }}*/}
        {/*/>*/}
        {/*<Dropdown*/}
        {/*  header={"burgers"}*/}
        {/*  subItems={["classic", "cheeseBurger", "bigMac", "bigTasty"]}*/}
        {/*  onSelectSubItem={(subItem) => {*/}
        {/*    dispatch(setDropDownActiveItem("burgers"));*/}
        {/*    dispatch(setDropDownActiveSubItem(subItem));*/}
        {/*  }}*/}
        {/*/>*/}
        {/*<Dropdown*/}
        {/*  header={"baget"}*/}
        {/*  subItems={["withHam", "withPastra", "garlic", "withPepperGrill"]}*/}
        {/*  onSelectSubItem={(subItem) => {*/}
        {/*    dispatch(setDropDownActiveItem("baget"));*/}
        {/*    dispatch(setDropDownActiveSubItem(subItem));*/}
        {/*  }}*/}
        {/*/>*/}
      </div>
    </div>
  );
};

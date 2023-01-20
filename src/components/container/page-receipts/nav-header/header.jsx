import styles from "./header.module.scss";
import { headerNavSlice } from "store/reducers/header-nav-slice";
import { useSelector } from "react-redux";
import { headerNavItems } from "../../../../app-constants";

const NavItem = ({ item, onItemClick, active }) => {
  const onClick = () => onItemClick(item);
  return (
    <div
      onClick={onClick}
      className={
        active
          ? [styles.navItem, styles.navItemActive].join(" ")
          : styles.navItem
      }
    >
      {item.name}
    </div>
  );
};
export const Header = () => {
  const { activeHeaderNavItem } = useSelector(
    (state) => state.headerNavReducer
  );
  const { setActiveHeaderNavItem } = headerNavSlice.actions;
  const onItemClick = (item) => setActiveHeaderNavItem(item.id);

  return (
    <div className={styles.headerContainer}>
      {headerNavItems.map((item) => (
        <NavItem
          key={item.id}
          item={item}
          active={item.id === activeHeaderNavItem?.id}
          onItemClick={onItemClick}
        />
      ))}
    </div>
  );
};

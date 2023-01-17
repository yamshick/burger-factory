import styles from "./header.module.scss";
import { useState } from "react";
import { Receipt } from "./receipt";
import { CookingTime } from "./cooking-time";
import { Serving } from "./serving";

const navItems = [
  {
    id: 1,
    name: "Рецепт",
    component: Receipt,
  },
  {
    id: 2,
    name: "Время приготовления",
    component: CookingTime,
  },
  {
    id: 3,
    name: "Подача",
    component: Serving,
  },
];
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
  const [activeItemId, setActiveItemId] = useState(1);
  const onItemClick = (item) => setActiveItemId(item.id);

  return (
    <div className={styles.headerContainer}>
      {navItems.map((item, idx) => (
        <NavItem
          key={item.id}
          item={item}
          active={item.id === activeItemId}
          onItemClick={onItemClick}
        />
      ))}
    </div>
  );
};

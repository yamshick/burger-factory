import styles from "./side-bar.module.scss";
import Logo from "./logo.svg";
import ArrowRight from "./arrow-right.svg";
import ArrowLeft from "./arrow-left.svg";
import { useState } from "react";
import { Dropdown } from "./dropdown/dropdown";

export const SideBar = () => {
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
        <div>Добро пожаловать в "Фабрику бургеров"</div>
        <div className={styles.toggleIconWrapper}>
          <ArrowLeft onClick={toggleOpen} />
        </div>
        <Dropdown header={"Сендвичи"} items={[]} onSelectItem={console.log} />
        <Dropdown
          header={"Бургеры"}
          items={["Классический", "Чизбургер", "Биг Мак", "Биг Тейсти"]}
          onSelectItem={console.log}
        />
        <Dropdown
          header={"Багет"}
          items={["С ветчиной", "С пастрами", "Чесночный", "С перцем-гриль"]}
          onSelectItem={console.log}
        />
      </div>
    </div>
  );
};

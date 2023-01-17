import styles from "./side-bar.module.scss";
import Logo from "./logo.svg";
import ArrowRight from './arrow-right.svg'
import ArrowLeft from './arrow-left.svg'
import { useState } from "react";

export const SideBar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleOpen = () => setIsOpen(!isOpen)

  return (
    <div className={styles.sideBarWrapper}>
      <div className={styles.sideBarContainer}>
        {isOpen ? (
          <>
            <Logo />
            <div>Добро пожаловать в "Фабрику бургеров"</div>
              <div className={styles.toggleIconWrapper}>
                  <ArrowLeft onClick={toggleOpen}/>
              </div>
          </>
        ) : (
            <div className={styles.toggleIconWrapper}>
                <ArrowRight onClick={toggleOpen}/>
            </div>
        )}
      </div>
    </div>
  );
};

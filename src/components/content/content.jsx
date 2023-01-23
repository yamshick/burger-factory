import styles from "./content.module.scss";
import { NavBar } from "./nav-bar/nav-bar";
export const Content = () => {
  return (
    <div className={styles.container}>
      <NavBar />
    </div>
  );
};

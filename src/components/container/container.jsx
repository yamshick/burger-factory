import styles from "./container.module.scss";
import { Header } from "./page-header/header";
import { NavBar } from "./nav-bar/nav-bar";
export const Container = () => {
  return (
    <div className={styles.container}>
      <NavBar />
      <Header />
    </div>
  );
};

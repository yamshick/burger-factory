import styles from "./container.module.scss";
import { Header } from "./page-receipts/nav-header/header";
import { NavBar } from "./nav-bar/nav-bar";
import { BreadCrumbs } from "./bread-crumbs/bread-crumbs";
export const Container = () => {
  return (
    <div className={styles.container}>
      <NavBar />
    </div>
  );
};

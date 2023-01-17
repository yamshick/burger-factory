import styles from "./container.module.scss";
import { Header } from "./page-header/header";
export const Container = () => {
  return (
    <div className={styles.container}>
      Container
      <Header />
    </div>
  );
};

import styles from "./app.module.scss";
import { SideBar } from "./components/side-bar/side-bar";
import { Container } from "./components/container/container";
export const App = () => {
  return (
    <div>
      <div className={styles.mainContainer}>
        <SideBar />
        <Container />
      </div>
    </div>
  );
};

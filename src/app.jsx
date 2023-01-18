import styles from "./app.module.scss";
import { SideBar } from "./components/side-bar/side-bar";
import { Container } from "./components/container/container";
import { Provider } from "react-redux";
import { setupStore } from "./store/store";
import { CreateBlockModal } from "./components/modal/create-block/create-block-modal";

const store = setupStore();
export const App = () => {
  return (
    <Provider store={store}>
      <div>
        <div className={styles.mainContainer}>
          <SideBar />
          <Container />
        </div>
        <CreateBlockModal />
      </div>
    </Provider>
  );
};

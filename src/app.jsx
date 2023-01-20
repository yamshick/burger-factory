import styles from "./app.module.scss";
import { SideBar } from "./components/side-bar/side-bar";
import { Content } from "./components/container/content";
import { CreateBlockModal } from "./components/modal/create-block/create-block-modal";
import { useSelector } from "react-redux";
import { CreateGroupModal } from "./components/modal/create-group/create-group-modal";
import { AddIngredientModal } from "./components/modal/add-ingredient/add-ingredient-modal";

export const App = () => {
  const {
    isNewBlockModalOpen,
    isNewGroupModalOpen,
    isAddIngredientsModalOpen,
  } = useSelector((state) => state.modalReducer);

  return (
    <div>
      <div className={styles.mainContainer}>
        <SideBar />
        <Content />
      </div>
      {isNewBlockModalOpen && <CreateBlockModal />}
      {isNewGroupModalOpen && <CreateGroupModal />}
      {isAddIngredientsModalOpen && <AddIngredientModal />}
    </div>
  );
};

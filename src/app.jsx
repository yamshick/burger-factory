import styles from "./app.module.scss";
import { SideBar } from "./components/side-bar/side-bar";
import { Content } from "./components/container/content";
import { CreateBlockModal } from "./components/modal/create-block/create-block-modal";
import { useDispatch, useSelector } from "react-redux";
import { sideBarSlice } from "./store/reducers/side-bar-slice";
import { modalSlice } from "./store/reducers/modal-slice";
import { blocksSlice } from "./store/reducers/blocks-slice";
import { useEffect } from "react";
import { CreateGroupModal } from "./components/modal/create-group/create-group-modal";
import { AddIngredientModal } from "./components/modal/add-ingredient/add-ingredient-modal";

export const App = () => {
  const dispatch = useDispatch();
  const { setWholeState: setWholeStateSideBarSlice } = sideBarSlice.actions;
  const { setWholeState: setWholeStateModalSlice } = modalSlice.actions;
  const { setWholeState: setWholeStateBlockSlice } = blocksSlice.actions;

  const {
    isNewBlockModalOpen,
    isNewGroupModalOpen,
    isAddIngredientsModalOpen,
  } = useSelector((state) => state.modalReducer);

  const state = JSON.parse(localStorage.getItem("state"));
  useEffect(() => {
    if (state) {
      dispatch(setWholeStateBlockSlice(state.blocksReducer));
      dispatch(setWholeStateModalSlice(state.modalReducer));
      dispatch(setWholeStateSideBarSlice(state.sideBarReducer));
    }
  }, []);

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

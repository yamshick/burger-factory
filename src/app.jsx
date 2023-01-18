import styles from "./app.module.scss";
import { SideBar } from "./components/side-bar/side-bar";
import { Container } from "./components/container/container";
import { CreateBlockModal } from "./components/modal/create-block/create-block-modal";
import { useDispatch } from "react-redux";
import { sideBarSlice } from "./store/reducers/side-bar-slice";
import { modalSlice } from "./store/reducers/modal-slice";
import { blocksSlice } from "./store/reducers/blocks-slice";
import { useEffect } from "react";
import {CreateGroupModal} from "./components/modal/create-group/create-group-modal";

export const App = () => {
  const dispatch = useDispatch();
  const { setWholeState: setWholeStateSideBarSlice } = sideBarSlice.actions;
  const { setWholeState: setWholeStateModalSlice } = modalSlice.actions;
  const { setWholeState: setWholeStateBlockSlice } = blocksSlice.actions;

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
        <Container />
      </div>
      <CreateBlockModal />
      <CreateGroupModal />
    </div>
  );
};

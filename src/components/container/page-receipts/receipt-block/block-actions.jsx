import styles from "./block.module.scss";
import RedPlus from "assets/icons/red-plus.svg";
import { useDispatch } from "react-redux";
import { modalSlice } from "store/reducers/modal-slice";

export const BlockActions = ({ id }) => {
  const dispatch = useDispatch();
  const {
    setIsNewGroupModalOpen,
    setAddGroupModalData,
    setIsAddIngredientsModalOpen,
    setAddIngredientModalData,
  } = modalSlice.actions;

  const onAddIngredientClick = () => {
    dispatch(setIsAddIngredientsModalOpen(true));
    dispatch(setAddIngredientModalData({ receiptBlockId: id }));
  };

  const onAddGroupClick = () => {
    dispatch(setIsNewGroupModalOpen(true));
    dispatch(setAddGroupModalData({ receiptBlockId: id }));
  };

  return (
    <div className={styles.buttonsContainer}>
      <button
        onClick={onAddIngredientClick}
        className={styles.receiptBlockActionButton}
      >
        <div className={styles.buttonContent}>
          <RedPlus />
          <span>Ингредиент</span>
        </div>
      </button>
      <button
        onClick={onAddGroupClick}
        className={styles.receiptBlockActionButton}
      >
        <div className={styles.buttonContent}>
          <RedPlus />
          <span>Группа</span>
        </div>
      </button>
    </div>
  );
};

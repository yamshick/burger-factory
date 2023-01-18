import styles from "./receipt-block.module.scss";
import RedPlus from "./red-plus.svg";
import { useDispatch } from "react-redux";
import { modalSlice } from "../../../../store/reducers/modal-slice";

export const ReceiptBlockActions = ({ id }) => {
  const dispatch = useDispatch();
  const { setIsNewGroupModalOpen, setAddGroupModalData } = modalSlice.actions;
  const onAddGroupClick = () => {
    dispatch(setIsNewGroupModalOpen(true));
    dispatch(setAddGroupModalData({ receiptBlockId: id }));
  };

  return (
    <div>
      <button className={styles.receiptBlockActionButton}>
        <RedPlus />
        Ингредиент
      </button>
      <button
        onClick={onAddGroupClick}
        className={styles.receiptBlockActionButton}
      >
        <RedPlus />
        Группа
      </button>
    </div>
  );
};

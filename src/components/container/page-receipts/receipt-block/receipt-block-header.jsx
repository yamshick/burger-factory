import { blocksSlice } from "store/reducers/blocks-slice";
import { useDispatch } from "react-redux";
import styles from "./receipt-block.module.scss";
import CloseCross from "assets/icons/close-cross.svg";

export const ReceiptBlockHeader = ({ id, name }) => {
  const { removeBlock } = blocksSlice.actions;
  const dispatch = useDispatch();
  const onClick = () => {
    dispatch(removeBlock(id));
  };

  return (
    <div className={styles.receiptBlockHeader}>
      {name}
      <CloseCross className={styles.closeCross} onClick={onClick} />
    </div>
  );
};

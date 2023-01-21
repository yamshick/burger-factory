import { blocksSlice } from "store/reducers/blocks-slice";
import { useDispatch } from "react-redux";
import styles from "./block.module.scss";
import CloseCross from "assets/icons/close-cross.svg";

export const BlockHeader = ({ id, name }) => {
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

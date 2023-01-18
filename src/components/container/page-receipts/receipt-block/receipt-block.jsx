import styles from "./receipt-block.module.scss";
import CloseCross from "./close-cross.svg";
import { blocksSlice } from "store/reducers/blocks-slice";
import { useDispatch } from "react-redux";
import RedPlus from "./red-plus.svg";
const ReceiptBlockHeader = ({ id, name }) => {
  const { removeBlock } = blocksSlice.actions;
  const dispatch = useDispatch();

  return (
    <div className={styles.receiptBlockHeader}>
      {name}
      <CloseCross onClick={() => dispatch(removeBlock(id))} />
    </div>
  );
};

const ReceiptBlockActions = () => {
  return (
    <div>
      <button className={styles.receiptBlockActionButton}>
        <RedPlus />
        Ингредиент
      </button>
      <button>
        <RedPlus className={styles.receiptBlockActionButton} />
        Группа
      </button>
    </div>
  );
};

const ReceiptBlockTable = () => <div>TABLE</div>;
export const ReceiptBlock = ({ id, name, group }) => {
  return (
    <>
      <ReceiptBlockHeader id={id} name={name} />
      <ReceiptBlockActions />
      <ReceiptBlockTable group={group} />
    </>
  );
};

import styles from "./receipt-block.module.scss";
import RedPlus from "./red-plus.svg";

export const ReceiptBlockActions = () => {
  return (
    <div>
      <button className={styles.receiptBlockActionButton}>
        <RedPlus />
        Ингредиент
      </button>
      <button className={styles.receiptBlockActionButton}>
        <RedPlus />
        Группа
      </button>
    </div>
  );
};

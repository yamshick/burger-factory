import styles from "./receipt-block.module.scss";
import { ReceiptBlockHeader } from "./receipt-block-header";
import { ReceiptBlockActions } from "./receipt-block-actions";
import { ReceiptBlockTable } from "./receipt-block-table";

export const ReceiptBlock = ({ id, name, group }) => {
  return (
    <div className={styles.receiptBlock}>
      <ReceiptBlockHeader id={id} name={name} />
      <ReceiptBlockActions />
      <ReceiptBlockTable group={group} />
    </div>
  );
};

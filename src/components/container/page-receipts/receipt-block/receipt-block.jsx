import styles from "./receipt-block.module.scss";
import { ReceiptBlockHeader } from "./receipt-block-header";
import { ReceiptBlockActions } from "./receipt-block-actions";
import { ReceiptBlockTable } from "./receipt-block-table";

export const ReceiptBlock = ({ id, name, groups }) => {
  return (
    <div className={styles.receiptBlock}>
      <ReceiptBlockHeader id={id} name={name} />
      <ReceiptBlockActions id={id} />
      <ReceiptBlockTable receiptBlockId={id} groups={groups} />
    </div>
  );
};

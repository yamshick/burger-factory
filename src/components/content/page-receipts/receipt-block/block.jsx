import styles from "./block.module.scss";
import { BlockHeader } from "./block-header";
import { BlockActions } from "./block-actions";
import { BlockTable } from "./block-table";

export const Block = ({ id, name, groups }) => {
  return (
    <div className={styles.receiptBlock}>
      <BlockHeader id={id} name={name} />
      <BlockActions id={id} />
      <BlockTable receiptBlockId={id} groups={groups} />
    </div>
  );
};

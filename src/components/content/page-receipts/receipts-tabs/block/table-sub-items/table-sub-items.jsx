import styles from "../block-table.module.scss";
import { TableSubItem } from "./sub-item";

export const TableSubItems = ({
  isParentGroupChecked,
  blockId,
  groupId,
  subItems,
}) => {
  return (
    <>
      {subItems?.map(({ id, name, weight, calories, notes }) => (
        <div key={id} className={styles.row}>
          <TableSubItem
            id={id}
            name={name}
            weight={weight}
            calories={calories}
            notes={notes}
            blockId={blockId}
            groupId={groupId}
            isParentGroupChecked={isParentGroupChecked}
          />
        </div>
      ))}
    </>
  );
};

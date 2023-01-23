import { EditableElement } from "../../../../../editable-element/editable-element";
import CloseCross from "assets/icons/close-cross.svg";
import { useDispatch } from "react-redux";
import { blocksSlice } from "store/reducers/blocks-slice";
import Dots from "assets/icons/dots.svg";
import styles from "../block-table.module.scss";
import { TableSubItem } from "./sub-item";

export const TableSubItems = ({
  isParentGroupChecked,
  blockId,
  groupId,
  ingredients,
}) => {
  return (
    <>
      {ingredients?.map(({ id, name, weight, calories, notes }) => (
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

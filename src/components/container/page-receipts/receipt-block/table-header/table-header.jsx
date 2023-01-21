import { blocksSlice } from "../../../../../store/reducers/blocks-slice";
import { useState } from "react";
import styles from "../block-table.module.scss";
import CloseCross from "../../../../../assets/icons/close-cross.svg";
import { useDispatch } from "react-redux";

export const TableHeader = ({ blockId }) => {
  const { selectAllGroups, resetGroupSelection } = blocksSlice.actions;
  const dispatch = useDispatch();

  const [isChecked, setIsChecked] = useState(false);
  const onCheck = (event) => {
    const { checked } = event.target;
    if (checked) {
      setIsChecked(true);
      dispatch(selectAllGroups({ blockId }));
    } else {
      setIsChecked(false);
      dispatch(resetGroupSelection());
    }
  };

  return (
    <div className={[styles.row, styles.headerRow].join(" ")}>
      <div className={styles.checkboxWrapper}>
        <input
          className={styles.checkbox}
          type={"checkbox"}
          onChange={onCheck}
          checked={isChecked}
        />
      </div>
      <div className={styles.name}> Название </div>
      <div className={styles.weight}> Вес </div>
      <div className={styles.calories}> Ккал </div>
      <div className={styles.notes}> Примечания </div>
      <div className={styles.removeIconHeader}>
        <CloseCross />
      </div>
    </div>
  );
};

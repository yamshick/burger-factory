import { blocksSlice } from "../../../../../../store/reducers/blocks-slice";
import { useState } from "react";
import styles from "../block-table.module.scss";
import { useDispatch } from "react-redux";

export const TableHeader = ({ blockId }) => {
  const { selectAllBlockItems, resetBlockItemSelection } = blocksSlice.actions;
  const dispatch = useDispatch();

  const [isChecked, setIsChecked] = useState(false);
  const onCheck = (event) => {
    const { checked } = event.target;
    if (checked) {
      setIsChecked(true);
      dispatch(selectAllBlockItems({ blockId }));
    } else {
      setIsChecked(false);
      dispatch(resetBlockItemSelection({blockId}));
    }
  };

  return (
    <div className={[styles.row, styles.headerRow].join(" ")}>
      <div className={[styles.cell, styles.dots].join(" ")}> </div>
      <div className={[styles.cell, styles.checkboxWrapper].join(" ")}>
        <input
          className={styles.checkbox}
          type={"checkbox"}
          onChange={onCheck}
          checked={isChecked}
        />
      </div>
      <div className={[styles.cell, styles.name].join(" ")}> Название </div>
      <div className={[styles.cell, styles.weight].join(" ")}> Вес </div>
      <div className={[styles.cell, styles.calories].join(" ")}> Ккал </div>
      <div className={[styles.cell, styles.notes].join(" ")}> Примечания </div>
      <div className={[styles.cell, styles.removeIcon].join(" ")}></div>
    </div>
  );
};

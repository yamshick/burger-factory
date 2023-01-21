import update from "immutability-helper";
import { TableItem } from "./table-item/table-item";
import { useCallback, useEffect, useState } from "react";
import { blocksSlice } from "../../../../store/reducers/blocks-slice";
import { useDispatch, useSelector } from "react-redux";
import styles from "./receipt-block-table.module.scss";
import CloseCross from "assets/icons/close-cross.svg";

export const ReceiptBlockTable = ({ receiptBlockId, groups }) => {
  const { setGroups } = blocksSlice.actions;
  const dispatch = useDispatch();

  const [currentGroups, setCurrentGroups] = useState(groups);
  const setGroupsToStore = () =>
    dispatch(setGroups({ blockId: receiptBlockId, groups: currentGroups }));

  useEffect(() => {
    setGroupsToStore(currentGroups);
  }, [currentGroups]);

  const moveCard = useCallback((dragIndex, hoverIndex) => {
    setCurrentGroups((prevCards) =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex]],
        ],
      })
    );
  }, []);

  const { selectAllGroups, resetGroupSelection } = blocksSlice.actions;

  const [isChecked, setIsChecked] = useState(false);
  const onCheck = (event) => {
    const { checked } = event.target;
    if (checked) {
      setIsChecked(true);
      dispatch(selectAllGroups({ blockId: receiptBlockId }));
    } else {
      setIsChecked(false);
      dispatch(resetGroupSelection());
    }
  };
  return (
    <div className={styles.mainContainer}>
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
      {currentGroups.map(
        ({ id, name, weight, calories, notes, ingredients, type }, index) => (
          <TableItem
            type={type}
            key={id}
            id={id}
            receiptBlockId={receiptBlockId}
            name={name}
            weight={weight}
            calories={calories}
            notes={notes}
            ingredients={ingredients}
            index={index}
            moveCard={moveCard}
          />
        )
      )}
    </div>
  );
};

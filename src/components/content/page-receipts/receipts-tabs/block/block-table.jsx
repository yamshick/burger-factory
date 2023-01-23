import update from "immutability-helper";
import { TableItem } from "./table-item/table-item";
import { useCallback, useEffect, useState } from "react";
import { blocksSlice } from "store/reducers/blocks-slice";
import { useDispatch } from "react-redux";
import styles from "./block-table.module.scss";
import { TableHeader } from "./table-header/table-header";

export const BlockTable = ({ receiptBlockId, groups }) => {
  const { setGroups } = blocksSlice.actions;
  const dispatch = useDispatch();

  const [currentGroups, setCurrentGroups] = useState(groups);
  const setGroupsToStore = () =>
    dispatch(setGroups({ blockId: receiptBlockId, groups: currentGroups }));

  useEffect(() => {
    setGroupsToStore(currentGroups);
  }, [currentGroups]);

  useEffect(() => {
    setCurrentGroups(groups);
  }, [groups]);
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

  return (
    <div className={styles.mainContainer}>
      <TableHeader blockId={receiptBlockId} />
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

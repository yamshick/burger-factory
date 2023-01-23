import update from "immutability-helper";
import { TableItem } from "./table-item/table-item";
import { useCallback, useEffect, useState } from "react";
import { blocksSlice } from "store/reducers/blocks-slice";
import { useDispatch } from "react-redux";
import styles from "./block-table.module.scss";
import { TableHeader } from "./table-header/table-header";

export const BlockTable = ({ receiptBlockId, blockItems }) => {
  const { setBlockItems } = blocksSlice.actions;
  const dispatch = useDispatch();

  const [currentBlockItems, setCurrentBlockItems] = useState(blockItems);
  const setBlockItemsToStore = () =>
    dispatch(
      setBlockItems({ blockId: receiptBlockId, blockItems: currentBlockItems })
    );

  useEffect(() => {
    setBlockItemsToStore(currentBlockItems);
  }, [currentBlockItems]);

  useEffect(() => {
    setCurrentBlockItems(blockItems);
  }, [blockItems]);

  const moveCard = useCallback((dragIndex, hoverIndex) => {
    setCurrentBlockItems((prevCards) =>
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
      {currentBlockItems.map(
        ({ id, name, weight, calories, notes, subItems, type }, index) => (
          <TableItem
            type={type}
            key={id}
            id={id}
            receiptBlockId={receiptBlockId}
            name={name}
            weight={weight}
            calories={calories}
            notes={notes}
            subItems={subItems}
            index={index}
            moveCard={moveCard}
          />
        )
      )}
    </div>
  );
};

import update from "immutability-helper";
import { IngredientsGroup } from "./receipt-block-group/group";
import { useCallback, useEffect, useState } from "react";
import { blocksSlice } from "../../../../store/reducers/blocks-slice";
import { useDispatch } from "react-redux";

export const ReceiptBlockTable = ({ receiptBlockId, groups }) => {
  const [cards, setCards] = useState(groups);

  useEffect(() => {
    setCards(groups);
  }, [groups]);

  const moveCard = useCallback((dragIndex, hoverIndex) => {
    setCards((prevCards) =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex]],
        ],
      })
    );
  }, []);

  const { selectAllGroups, resetGroupSelection } = blocksSlice.actions;
  const dispatch = useDispatch();

  const [isChecked, setIsChecked] = useState(false)
  const onCheck = (event) => {
    const { checked } = event.target;
    if (checked) {
      setIsChecked(true)
      dispatch(selectAllGroups({ blockId: receiptBlockId }));
    } else {
      setIsChecked(false)
      dispatch(resetGroupSelection());
    }
  };
  return (
    <div style={{ marginTop: "5px" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <input type={"checkbox"} onChange={onCheck} checked={isChecked}/>
        <div> Название </div>
        <div> Вес </div>
        <div> Ккал </div>
        <div> Примечания </div>
      </div>
      {cards.map(({ id, name, weight, calories, notes }, index) => (
        <IngredientsGroup
          key={id}
          id={id}
          receiptBlockId={receiptBlockId}
          name={name}
          weight={weight}
          calories={calories}
          notes={notes}
          index={index}
          moveCard={moveCard}
        />
      ))}
    </div>
  );
};

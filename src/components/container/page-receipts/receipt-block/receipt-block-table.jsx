import update from "immutability-helper";
import { IngredientsGroup } from "./receipt-block-group/group";
import { useCallback, useState } from "react";

export const ReceiptBlockTable = ({ receiptBlockId, groups }) => {
  const [cards, setCards] = useState(groups);
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

  return (
    <div style={{ marginTop: "5px" }}>
      {cards.map(({ id, name }, index) => (
        <IngredientsGroup
          key={id}
          id={id}
          receiptBlockId={receiptBlockId}
          name={name}
          index={index}
          moveCard={moveCard}
        />
      ))}
    </div>
  );
};

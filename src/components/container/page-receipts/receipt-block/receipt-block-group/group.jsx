import { useDrag, useDrop } from "react-dnd";
import { useRef } from "react";
import styles from "./group.module.scss";
import { EditableElement } from "../../../../editable-element/editable-element";

const ItemTypes = {
  CARD: "card",
};

export const IngredientsGroup = ({ id, receiptBlockId, index, name, moveCard }) => {
  const ref = useRef(null);
  const [{ handlerId }, drop] = useDrop({
    accept: ItemTypes.CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  drag(drop(ref));

  return (
    <div
      ref={ref}
      className={
        isDragging
          ? [styles.group, styles.groupIsDragging].join(" ")
          : styles.group
      }
      data-handler-id={handlerId}
    >
      <input
        className={styles.checkbox}
        type={"checkbox"}
        onChange={console.log}
      />
      {/*<div>{name}</div>*/}
      <EditableElement onChange={(event) => {
        console.log(event)
        console.log({receiptBlockId})
      }}>
        <div>{name}</div>
      </EditableElement>
    </div>
  );
};

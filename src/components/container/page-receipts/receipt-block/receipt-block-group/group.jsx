import { useDrag, useDrop } from "react-dnd";
import { useRef, useState } from "react";
import styles from "./group.module.scss";
import tableStyles from "../receipt-block-table.module.scss";
import { EditableElement } from "../../../../editable-element/editable-element";
import { blocksSlice } from "../../../../../store/reducers/blocks-slice";
import { useDispatch, useSelector } from "react-redux";
import { Ingredients } from "../ingredients/ingredients";
import CloseCross from "assets/icons/close-cross.svg";
import Dotes from "assets/icons/dotes.svg";

const ItemTypes = {
  CARD: "card",
};

export const IngredientsGroup = ({
  type,
  id,
  receiptBlockId,
  index,
  name,
  weight,
  calories,
  notes,
  moveCard,
  ingredients,
}) => {
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

  const [groupName, setGroupName] = useState(name);
  const { updateGroupName, removeGroup } = blocksSlice.actions;
  const dispatch = useDispatch();
  const onEditableElementChange = (value) => {
    setGroupName(value);
  };

  const onEditableElementBlur = () => {
    if (groupName) {
      dispatch(
        updateGroupName({ blockId: receiptBlockId, groupId: id, groupName })
      );
    }
  };

  const { selectGroup, unSelectGroup } = blocksSlice.actions;
  const { selectedGroupIds } = useSelector((state) => state.blocksReducer);
  const isChecked = selectedGroupIds[receiptBlockId]?.includes(id);
  const isDisabled =
    Object.keys(selectedGroupIds).length &&
    Number(Object.keys(selectedGroupIds)[0]) !== receiptBlockId;
  const onCheck = (event) => {
    const { checked } = event.target;

    checked
      ? dispatch(selectGroup({ blockId: receiptBlockId, groupId: id }))
      : dispatch(unSelectGroup({ blockId: receiptBlockId, groupId: id }));
  };

  const onGroupRemoveClick = () =>
    dispatch(removeGroup({ blockId: receiptBlockId, groupId: id }));

  return (
    <div
      ref={ref}
      className={
        isDragging
          ? [styles.group, styles.groupIsDragging].join(" ")
          : [styles.group].join(" ")
      }
      data-handler-id={handlerId}
    >
      <div className={tableStyles.row}>
        <div className={tableStyles.cell}>
          <Dotes />
        </div>
        <div
          className={[tableStyles.cell, tableStyles.checkboxWrapper].join(" ")}
        >
          <input
            className={tableStyles.checkbox}
            type={"checkbox"}
            onChange={onCheck}
            checked={isChecked}
            disabled={isDisabled}
          />
        </div>
        <div className={tableStyles.name}>
          <EditableElement
            onChange={onEditableElementChange}
            onBlur={onEditableElementBlur}
          >
            <div
              className={
                type === "GROUP"
                  ? [
                      tableStyles.groupName,
                      tableStyles.cell,
                      styles.editableElement,
                    ].join(" ")
                  : [tableStyles.cell, styles.editableElement].join(" ")
              }
            >
              {name}
            </div>
          </EditableElement>
        </div>
        <div className={[tableStyles.cell, tableStyles.weight].join(" ")}>
          {weight}
        </div>
        <div className={[tableStyles.cell, tableStyles.calories].join(" ")}>
          {calories}
        </div>
        <div className={[tableStyles.cell, tableStyles.notes].join(" ")}>
          {notes}
        </div>
        <div className={[tableStyles.cell, tableStyles.removeIcon].join(" ")}>
          <CloseCross onClick={onGroupRemoveClick} />
        </div>
      </div>
      <div>
        <Ingredients
          ingredients={ingredients}
          blockId={receiptBlockId}
          groupId={id}
        />
      </div>
    </div>
  );
};

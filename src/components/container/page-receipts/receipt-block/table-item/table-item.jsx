import { useDrag, useDrop } from "react-dnd";
import { useRef, useState } from "react";
import styles from "./table-item.module.scss";
import tableStyles from "../block-table.module.scss";
import { EditableElement } from "../../../../editable-element/editable-element";
import { blocksSlice } from "../../../../../store/reducers/blocks-slice";
import { useDispatch, useSelector } from "react-redux";
import { Ingredients } from "../ingredients/ingredients";
import CloseCross from "assets/icons/close-cross.svg";
import Dots from "assets/icons/dots.svg";
import { blockItemsTypes } from "../../../../../app-constants";

const ItemTypes = {
  CARD: "card",
};

export const TableItem = ({
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

  const [curName, setCurName] = useState(name);
  const [curWeight, setCurWeight] = useState(weight);
  const [curCalories, setCurCalories] = useState(calories);
  const [curNotes, setCurNotes] = useState(notes);

  const { removeGroup, updateGroup } = blocksSlice.actions;
  const dispatch = useDispatch();
  const onGroupNameChange = (value) => {
    setCurName(value);
  };
  const onNameBlur = () => {
    if (curName && curName !== name) {
      dispatch(
        updateGroup({
          blockId: receiptBlockId,
          groupId: id,
          data: { name: curName },
        })
      );
    }
  };

  const onWeightBlur = () => {
    if (curWeight && curWeight !== weight) {
      dispatch(
        updateGroup({
          blockId: receiptBlockId,
          groupId: id,
          data: { weight: curWeight },
        })
      );
    }
  };

  const onCaloriesBlur = () => {
    if (curCalories && curCalories !== calories) {
      dispatch(
        updateGroup({
          blockId: receiptBlockId,
          groupId: id,
          data: { calories: curCalories },
        })
      );
    }
  };

  const onNotesBlur = () => {
    if (curNotes && curNotes !== notes) {
      dispatch(
        updateGroup({
          blockId: receiptBlockId,
          groupId: id,
          data: { notes: curNotes },
        })
      );
    }
  };

  const { selectGroup, unSelectGroup } = blocksSlice.actions;
  const { selectedGroupIds } = useSelector((state) => state.blocksReducer);
  const isChecked = selectedGroupIds[receiptBlockId]?.includes(id);
  const isCheckboxDisabled =
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
        <div className={[tableStyles.cell, tableStyles.dots].join(" ")}>
          <Dots />
        </div>
        <div
          className={[tableStyles.cell, tableStyles.checkboxWrapper].join(" ")}
        >
          <input
            className={tableStyles.checkbox}
            type={"checkbox"}
            onChange={onCheck}
            checked={isChecked}
            disabled={isCheckboxDisabled}
          />
        </div>
        <div className={[tableStyles.cell, tableStyles.name].join(" ")}>
          <EditableElement
            onChange={onGroupNameChange}
            onBlur={onNameBlur}
            className={
              type === blockItemsTypes.GROUP
                ? [
                    tableStyles.groupName,
                    tableStyles.cell,
                    styles.editableElement,
                    tableStyles.editableContent,
                  ].join(" ")
                : [
                    tableStyles.cell,
                    styles.editableElement,
                    tableStyles.editableContent,
                  ].join(" ")
            }
          >
            <div>{name}</div>
          </EditableElement>
        </div>
        <EditableElement
          onChange={setCurWeight}
          onBlur={onWeightBlur}
          className={[
            tableStyles.cell,
            tableStyles.weight,
            tableStyles.editableContent,
          ].join(" ")}
        >
          <div>{weight}</div>
        </EditableElement>
        <EditableElement
          onChange={setCurCalories}
          onBlur={onCaloriesBlur}
          className={[
            tableStyles.cell,
            tableStyles.calories,
            tableStyles.editableContent,
          ].join(" ")}
        >
          <div>{calories}</div>
        </EditableElement>
        <EditableElement
          onChange={setCurNotes}
          onBlur={onNotesBlur}
          className={[
            tableStyles.cell,
            tableStyles.notes,
            tableStyles.editableContent,
          ].join(" ")}
        >
          <div>{notes}</div>
        </EditableElement>
        <div className={[tableStyles.cell, tableStyles.removeIcon].join(" ")}>
          <CloseCross onClick={onGroupRemoveClick} />
        </div>
      </div>
      <div>
        {type === blockItemsTypes.GROUP && (
          <Ingredients
            isParentGroupChecked={isChecked}
            ingredients={console.log({ ingredients }) || ingredients}
            blockId={receiptBlockId}
            groupId={id}
          />
        )}
      </div>
    </div>
  );
};

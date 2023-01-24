import styles from "../block-table.module.scss";
import Dots from "assets/icons/dots.svg";
import CloseCross from "assets/icons/close-cross.svg";
import { EditableElement } from "../../../../../editable-element/editable-element";
import { blocksSlice } from "store/reducers/blocks-slice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
export const TableSubItem = ({
  id,
  name,
  weight,
  calories,
  notes,
  blockId,
  groupId,
  isParentGroupChecked,
  isParentCheckboxDisabled,
}) => {
  const { checkedBlockSubItems } = useSelector((state) => state.blocksReducer);
  const { removeIngredient, updateBlockSubItem, checkBlockSubItem } =
    blocksSlice.actions;
  const dispatch = useDispatch();

  const [currentName, setCurrentName] = useState(name);
  const [currentWeight, setCurrentWeight] = useState(weight);
  const [currentCalories, setCurrentCalories] = useState(calories);
  const [currentNotes, setCurrentNotes] = useState(notes);

  const onCheck = (event) => {
    const { checked } = event.target;
    dispatch(checkBlockSubItem({ checked, id, blockId }));
  };
  const onNameBlur = () => {
    if (currentName && currentName !== name) {
      dispatch(
        updateBlockSubItem({
          blockId,
          blockItemId: groupId,
          blockSubItemId: id,
          data: { name: currentName },
        })
      );
    }
  };

  const onWeightBlur = () => {
    if (currentWeight && currentWeight !== weight) {
      dispatch(
        updateBlockSubItem({
          blockId,
          blockItemId: groupId,
          blockSubItemId: id,
          data: { weight: currentWeight },
        })
      );
    }
  };

  const onCaloriesBlur = () => {
    if (currentCalories && currentCalories !== calories) {
      dispatch(
        updateBlockSubItem({
          blockId,
          blockItemId: groupId,
          blockSubItemId: id,
          data: { calories: currentCalories },
        })
      );
    }
  };

  const onNotesBlur = () => {
    if (currentNotes && currentNotes !== notes) {
      dispatch(
        updateBlockSubItem({
          blockId,
          blockItemId: groupId,
          blockSubItemId: id,
          data: { notes: currentNotes },
        })
      );
    }
  };

  return (
    <>
      <div className={[styles.cell, styles.dots].join(" ")}>
        <Dots />
      </div>
      <div className={[styles.cell, styles.checkboxWrapper].join(" ")}>
        <input
          className={styles.checkbox}
          type={"checkbox"}
          checked={checkedBlockSubItems.includes(id)}
          // disabled={isParentCheckboxDisabled}
          onChange={onCheck}
        />
      </div>
      <EditableElement
        onChange={setCurrentName}
        onBlur={onNameBlur}
        className={[
          styles.cell,
          styles.name,
          styles.editableContent,
          styles.ingredientName,
        ].join(" ")}
      >
        <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{name}</div>
      </EditableElement>
      <EditableElement
        onChange={setCurrentWeight}
        onBlur={onWeightBlur}
        className={[styles.cell, styles.weight, styles.editableContent].join(
          " "
        )}
      >
        <div>{weight}</div>
      </EditableElement>
      <EditableElement
        onChange={setCurrentCalories}
        onBlur={onCaloriesBlur}
        className={[styles.cell, styles.calories, styles.editableContent].join(
          " "
        )}
      >
        <div>{calories}</div>
      </EditableElement>
      <EditableElement
        onChange={setCurrentNotes}
        onBlur={onNotesBlur}
        className={[styles.cell, styles.notes, styles.editableContent].join(
          " "
        )}
      >
        <div>{notes}</div>
      </EditableElement>
      <div
        className={[styles.cell, styles.removeIcon].join(" ")}
        onClick={() =>
          dispatch(
            removeIngredient({
              blockId,
              blockItemId: groupId,
              ingredientId: id,
            })
          )
        }
      >
        <CloseCross />
      </div>
    </>
  );
};

import CloseCross from "assets/icons/close-cross.svg";
import { useDispatch } from "react-redux";
import { blocksSlice } from "store/reducers/blocks-slice";
import Dots from "assets/icons/dots.svg";
import styles from "../block-table.module.scss";

export const TableSubItems = ({
  isParentGroupChecked,
  blockId,
  groupId,
  ingredients,
}) => {
  const { removeIngredient } = blocksSlice.actions;
  const dispatch = useDispatch();

  return (
    <>
      {ingredients?.map(({ id, name, weight, calories, notes }) => (
        <div key={id} className={styles.row}>
          <div className={[styles.cell, styles.dots].join(" ")}>
            <Dots />
          </div>
          <div className={[styles.cell, styles.checkboxWrapper].join(" ")}>
            <input
              className={styles.checkbox}
              type={"checkbox"}
              checked={isParentGroupChecked}
            />
          </div>
          <div className={[styles.cell, styles.name].join(" ")}>
            <div className={styles.ingredientName}>{name}</div>
          </div>
          <div className={[styles.cell, styles.weight].join(" ")}>
            <div>{weight}</div>
          </div>
          <div className={[styles.cell, styles.calories].join(" ")}>
            <div>{calories}</div>
          </div>
          <div className={[styles.cell, styles.notes].join(" ")}>
            <div>{notes}</div>
          </div>
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
        </div>
      ))}
    </>
  );
};

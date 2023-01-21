import CloseCross from "assets/icons/close-cross.svg";
import { useDispatch } from "react-redux";
import { blocksSlice } from "../../../../../store/reducers/blocks-slice";
export const Ingredients = ({
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
        <div
          key={id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginLeft: "20px",
          }}
        >
          <input type={"checkbox"} checked={isParentGroupChecked} />
          <div>{name}</div>
          <div>{weight}</div>
          <div>{calories}</div>
          <div>{notes}</div>
          <CloseCross
            onClick={() =>
              dispatch(removeIngredient({ blockId, groupId, ingredientId: id }))
            }
          />
        </div>
      ))}
    </>
  );
};

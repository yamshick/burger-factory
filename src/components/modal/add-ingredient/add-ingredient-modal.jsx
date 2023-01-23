import { modalSlice } from "../../../store/reducers/modal-slice";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "../modal";
import { blocksSlice } from "../../../store/reducers/blocks-slice";
import { Input } from "../input";
import { useEffect, useState } from "react";
import styles from "./add-ingredient-modal.module.scss";
import { Select } from "../select";
import { blockItemsTypes } from "../../../app-constants";
import { Button } from "../button";

export const AddIngredientModal = () => {
  const { setIsAddIngredientsModalOpen, resetAddIngredientModalData } =
    modalSlice.actions;
  const { addIngredient } = blocksSlice.actions;
  const { isAddIngredientsModalOpen, addIngredientsModalData } = useSelector(
    (state) => state.modalReducer
  );
  const { receiptBlocks } = useSelector((state) => state.blocksReducer);

  const blockId = addIngredientsModalData?.receiptBlockId;
  const blockItems =
    receiptBlocks
      ?.find(({ id }) => id === blockId)
      ?.items?.filter(({ type }) => type === blockItemsTypes.GROUP) || [];

  const dispatch = useDispatch();

  useEffect(() => {
    if (!isAddIngredientsModalOpen) {
      dispatch(resetAddIngredientModalData());
    }
  }, [isAddIngredientsModalOpen]);

  const [blockItemId, setBlockItemId] = useState(undefined);
  const [ingredientName, setIngredientName] = useState("");
  const [weight, setWeight] = useState("");
  const [calories, setCalories] = useState("");
  const [notes, setNotes] = useState("");

  const isAddIngredientButtonDisabled =
    !ingredientName && !weight && !calories && !notes;
  const onAddIngredientClick = () => {
    dispatch(
      addIngredient({
        blockId: addIngredientsModalData?.receiptBlockId,
        blockItemId,
        ingredient: {
          name: ingredientName,
          weight,
          calories,
          notes,
          type: blockItemsTypes.INGREDIENT,
        },
      })
    );
    dispatch(setIsAddIngredientsModalOpen(false));
  };
  const onClose = () => dispatch(setIsAddIngredientsModalOpen(false));

  return (
    <Modal isOpen={isAddIngredientsModalOpen} onClose={onClose}>
      <div className={styles.inputContainer}>
        <Select
          items={[
            { name: "Выберите группу", value: undefined, id: -1 },
            ...blockItems,
          ]}
          value={blockItemId}
          onSelect={setBlockItemId}
        />
      </div>
      <div className={styles.container}>
        <div>
          <Input
            type={"text"}
            placeholder={"Название ингредиента"}
            onChange={setIngredientName}
          />
        </div>
        <div>
          <Input
            type={"number"}
            placeholder={"Вес"}
            onChange={setWeight}
          />
        </div>
        <div>
          <Input
            type={"number"}
            placeholder={"Ккал"}
            onChange={setCalories}
          />
        </div>
        <div>
          <Input
            type={"text"}
            placeholder={"Примечания"}
            onChange={setNotes}
          />
        </div>
        <div>
          <Button
            onClick={onAddIngredientClick}
            disabled={isAddIngredientButtonDisabled}
          >
            Добавить
          </Button>
        </div>
      </div>
    </Modal>
  );
};

import { modalSlice } from "../../../store/reducers/modal-slice";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "../modal";
import { blocksSlice } from "../../../store/reducers/blocks-slice";
import { Input } from "../input";
import { useEffect, useState } from "react";
import styles from "./add-ingredient-modal.module.scss";
import { Select } from "../select";
import { blockItemsTypes } from "../../../app-constants";

export const AddIngredientModal = () => {
  const { setIsAddIngredientsModalOpen, resetAddIngredientModalData } =
    modalSlice.actions;
  const { addIngredient } = blocksSlice.actions;
  const { isAddIngredientsModalOpen, addIngredientsModalData } = useSelector(
    (state) => state.modalReducer
  );
  const { receiptBlocks } = useSelector((state) => state.blocksReducer);

  const blockId = addIngredientsModalData?.receiptBlockId;
  const groups =
    receiptBlocks
      ?.find(({ id }) => id === blockId)
      ?.groups?.filter(({ type }) => type === blockItemsTypes.GROUP) || [];

  const dispatch = useDispatch();

  useEffect(() => {
    if (!isAddIngredientsModalOpen) {
      dispatch(resetAddIngredientModalData());
    }
  }, [isAddIngredientsModalOpen]);

  const [groupId, setGroupId] = useState(undefined);
  const [ingredientName, setIngredientName] = useState("");
  const [weight, setWeight] = useState("");
  const [calories, setCalories] = useState("");
  const [notes, setNotes] = useState("");

  const onGroupIdSelect = (id) => {
    setGroupId(id);
  };
  const onIngredientNameChange = (value) => setIngredientName(value);
  const onWeightChange = (value) => setWeight(value);
  const onCaloriesChange = (value) => setCalories(value);
  const onNotesChange = (value) => setNotes(value);

  const isAddIngredientButtonDisabled =
    !ingredientName && !weight && !calories && !notes;
  const onAddIngredientClick = () => {
    dispatch(
      addIngredient({
        blockId: addIngredientsModalData?.receiptBlockId,
        groupId,
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
            ...groups,
          ]}
          value={groupId}
          onSelect={onGroupIdSelect}
        />
      </div>
      <div className={styles.container}>
        <div className={styles.inputContainer}>
          <Input
            type={"text"}
            placeholder={"Название ингредиента"}
            onChange={onIngredientNameChange}
          />
        </div>
        <div className={styles.inputContainer}>
          <Input
            type={"number"}
            placeholder={"Вес"}
            onChange={onWeightChange}
          />
        </div>
        <div className={styles.inputContainer}>
          <Input
            type={"number"}
            placeholder={"Ккал"}
            onChange={onCaloriesChange}
          />
        </div>
        <div className={styles.inputContainer}>
          <Input
            type={"text"}
            placeholder={"Примечания"}
            onChange={onNotesChange}
          />
        </div>
        <div className={styles.inputContainer}>
          <button
            onClick={onAddIngredientClick}
            disabled={isAddIngredientButtonDisabled}
          >
            Добавить ингредиент
          </button>
        </div>
      </div>
    </Modal>
  );
};

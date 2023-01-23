import { modalSlice } from "store/reducers/modal-slice";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "../modal";
import { blocksSlice } from "store/reducers/blocks-slice";
import { Input } from "../input";
import { useEffect, useState } from "react";
import styles from "./create-group-modal.modules.scss";
import { blockItemsTypes } from "../../../app-constants";
import { Button } from "../button";

export const CreateGroupModal = () => {
  const { setIsNewGroupModalOpen, resetAddGroupModalData } = modalSlice.actions;
  const { addBlockItem } = blocksSlice.actions;
  const { isNewGroupModalOpen, addGroupModalData } = useSelector(
    (state) => state.modalReducer
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isNewGroupModalOpen) {
      dispatch(resetAddGroupModalData());
    }
  }, [isNewGroupModalOpen]);

  const [groupName, setGroupName] = useState("");
  const [weight, setWeight] = useState("");
  const [calories, setCalories] = useState("");
  const [notes, setNotes] = useState("");

  const onGroupNameChange = (value) => setGroupName(value);
  const onWeightChange = (value) => setWeight(value);
  const onCaloriesChange = (value) => setCalories(value);
  const onNotesChange = (value) => setNotes(value);

  const isAddGroupButtonDisabled = !groupName && !weight && !calories && !notes;
  const onAddGroupClick = () => {
    dispatch(
      addBlockItem({
        blockId: addGroupModalData?.receiptBlockId,
        blockItem: {
          name: groupName,
          weight,
          calories,
          notes,
          type: blockItemsTypes.GROUP,
        },
      })
    );
    dispatch(setIsNewGroupModalOpen(false));
  };
  const onClose = () => dispatch(setIsNewGroupModalOpen(false));
  return (
    <Modal isOpen={isNewGroupModalOpen} onClose={onClose}>
      <div className={styles.container}>
        <div>
          <Input
            type={"text"}
            placeholder={"Название группы"}
            onChange={onGroupNameChange}
          />
        </div>
        <div>
          <Input
            type={"number"}
            placeholder={"Вес"}
            onChange={onWeightChange}
          />
        </div>
        <div>
          <Input
            type={"number"}
            placeholder={"Ккал"}
            onChange={onCaloriesChange}
          />
        </div>
        <div>
          <Input
            type={"text"}
            placeholder={"Примечания"}
            onChange={onNotesChange}
          />
        </div>
        <div>
          <Button onClick={onAddGroupClick} disabled={isAddGroupButtonDisabled}>
            Добавить
          </Button>
        </div>
      </div>
    </Modal>
  );
};

import { modalSlice } from "../../../store/reducers/modal-slice";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "../modal";
import { Input } from "../input";
import { blocksSlice } from "../../../store/reducers/blocks-slice";
import { useState } from "react";

export const CreateBlockModal = () => {
  const { setIsNewBlockModalOpen } = modalSlice.actions;
  const { addBlock } = blocksSlice.actions;
  const { isNewBlockModalOpen } = useSelector((state) => state.modalReducer);
  const {dropDownActiveSubItem} = useSelector(state => state.sideBarReducer)
  const snackId = dropDownActiveSubItem?.id;

  const dispatch = useDispatch();

  const [blockName, setBlockName] = useState("");
  const onChange = (value) => setBlockName(value);
  const onClick = () => {
    dispatch(addBlock({name: blockName, snackId}));
    dispatch(setIsNewBlockModalOpen(false));
  };
  const onClose = () => dispatch(setIsNewBlockModalOpen(false));
  return (
    <Modal isOpen={isNewBlockModalOpen} onClose={onClose}>
      <Input onChange={onChange} />
      <button onClick={onClick}>Добавить блок</button>
    </Modal>
  );
};

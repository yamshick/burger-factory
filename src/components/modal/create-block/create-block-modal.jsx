import { modalSlice } from "../../../store/reducers/modal-slice";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "../modal";
import { CreateBlockInput } from "./create-block-input";
import { blocksSlice } from "../../../store/reducers/blocks-slice";

export const CreateBlockModal = () => {
  const { setIsOpen } = modalSlice.actions;
  const { addBlock } = blocksSlice.actions;
  const { isOpen } = useSelector((state) => state.modalReducer);
  const dispatch = useDispatch();

  const onEnter = (blockName) => {
    dispatch(addBlock(blockName));
    dispatch(setIsOpen(false));
  };
  const onClose = () => dispatch(setIsOpen(false));
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <CreateBlockInput onEnter={onEnter} />
    </Modal>
  );
};

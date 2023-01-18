import { modalSlice } from "../../../store/reducers/modal-slice";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "../modal";
import { Input } from "../input";
import { blocksSlice } from "../../../store/reducers/blocks-slice";

export const CreateBlockModal = () => {
  const { setIsNewBlockModalOpen } = modalSlice.actions;
  const { addBlock } = blocksSlice.actions;
  const { isNewBlockModalOpen } = useSelector((state) => state.modalReducer);
  const dispatch = useDispatch();

  const onEnter = (blockName) => {
    dispatch(addBlock(blockName));
    dispatch(setIsNewBlockModalOpen(false));
  };
  const onClose = () => dispatch(setIsOpen(false));
  return (
    <Modal isOpen={isNewBlockModalOpen} onClose={onClose}>
      <Input onEnter={onEnter} />
    </Modal>
  );
};

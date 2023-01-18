import { modalSlice } from "../../../store/reducers/modal-slice";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "../modal";
import { blocksSlice } from "../../../store/reducers/blocks-slice";
import { Input } from "../input";
import { useEffect } from "react";

export const CreateGroupModal = () => {
  const { setIsNewGroupModalOpen, resetAddGroupModalData } = modalSlice.actions;
  const { addGroup } = blocksSlice.actions;
  const { isNewGroupModalOpen, addGroupModalData } = useSelector(
    (state) => state.modalReducer
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isNewGroupModalOpen) {
      dispatch(resetAddGroupModalData());
    }
  }, [isNewGroupModalOpen]);
  const onEnter = (groupName) => {
    dispatch(
      addGroup({ blockId: addGroupModalData?.receiptBlockId, groupName })
    );
    dispatch(setIsNewGroupModalOpen(false));
  };
  const onClose = () => dispatch(setIsNewGroupModalOpen(false));
  return (
    <Modal isOpen={isNewGroupModalOpen} onClose={onClose}>
      <Input onEnter={onEnter} />
    </Modal>
  );
};

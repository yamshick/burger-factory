import { useDispatch, useSelector } from "react-redux";
import { modalSlice } from "store/reducers/modal-slice";
import { NewBlockButton } from "../new-block-button/new-block-button";
import { Block } from "./block/block";
import { InfoPanel } from "../info-panel/info-panel";
export const BlocksTab = () => {
  const { receiptBlocks } = useSelector((state) => state.blocksReducer);
  const { dropDownActiveSubItem } = useSelector(
    (state) => state.sideBarReducer
  );
  const snackId = dropDownActiveSubItem?.id;

  const { setIsNewBlockModalOpen } = modalSlice.actions;
  const dispatch = useDispatch();

  const onNewBlockButtonClick = () => dispatch(setIsNewBlockModalOpen(true));

  return (
    <>
      <div>
        {receiptBlocks
          ?.filter(({ snackId: id }) => snackId === id)
          ?.map(({ name, id, groups }) => (
            <Block key={id} id={id} name={name} groups={groups} />
          ))}
      </div>
      <div>
        <NewBlockButton onClick={onNewBlockButtonClick} />
      </div>
      <InfoPanel />
    </>
  );
};

import { Header } from "./nav-header/header";
import { NewBlockButton } from "./new-block-button/new-block-button";
import { modalSlice } from "../../../store/reducers/modal-slice";
import { useDispatch, useSelector } from "react-redux";
import { ReceiptBlock } from "./receipt-block/receipt-block";
import { InfoPanel } from "./info-panel/info-panel";
export const Receipts = () => {
  const { receiptBlocks } = useSelector((state) => state.blocksReducer);
  const { dropDownActiveSubItem } = useSelector(
    (state) => state.sideBarReducer
  );
  const { activeHeaderNavItem } = useSelector(
    (state) => state.headerNavReducer
  );
  const snackId = dropDownActiveSubItem?.id;

  const { setIsNewBlockModalOpen } = modalSlice.actions;
  const dispatch = useDispatch();

  const onNewBlockButtonClick = () => dispatch(setIsNewBlockModalOpen(true));

  return (
    <>
      <Header />
      {activeHeaderNavItem.id === 1 && (
        <>
          <div>
            {receiptBlocks
              ?.filter(({ snackId: id }) => snackId === id)
              ?.map(({ name, id, groups }) => (
                <ReceiptBlock key={id} id={id} name={name} groups={groups} />
              ))}
          </div>
          <div>
            <NewBlockButton onClick={onNewBlockButtonClick} />
          </div>
          <InfoPanel />
        </>
      )}
      {activeHeaderNavItem.id === 2 && <div> Время приготовления </div>}
      {activeHeaderNavItem.id === 3 && <div> Подача </div>}
    </>
  );
};

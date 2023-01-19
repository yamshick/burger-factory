import { Header } from "./nav-header/header";
import { NewBlockButton } from "./new-block-button/new-block-button";
import { modalSlice } from "../../../store/reducers/modal-slice";
import { useDispatch, useSelector } from "react-redux";
import { ReceiptBlock } from "./receipt-block/receipt-block";
import { InfoPanel } from "./info-panel/info-panel";
export const PageReceipts = () => {
  const { receiptBlocks } = useSelector((state) => state.blocksReducer);
  const { setIsNewBlockModalOpen } = modalSlice.actions;
  const dispatch = useDispatch();

  const onNewBlockButtonClick = () => dispatch(setIsNewBlockModalOpen(true));

  return (
    <>
      <Header />
      <div>
        {receiptBlocks?.map(({ name, id, groups }) => (
          <ReceiptBlock key={id} id={id} name={name} groups={groups} />
        ))}
      </div>
      <div>
        <NewBlockButton onClick={onNewBlockButtonClick} />
      </div>
      <InfoPanel />
    </>
  );
};

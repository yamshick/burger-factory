import { Header } from "./nav-header/header";
import { NewBlockButton } from "./new-block-button/new-block-button";
import { modalSlice } from "../../../store/reducers/modal-slice";
import { useDispatch, useSelector } from "react-redux";

export const PageReceipts = () => {
  const { receiptBlocks } = useSelector((state) => state.blocksReducer);
  const { setIsOpen } = modalSlice.actions;
  const dispatch = useDispatch();

  console.log({ receiptBlocks });
  const onNewBlockButtonClick = () => dispatch(setIsOpen(true));
  return (
    <>
      <Header />
      <div>
        {receiptBlocks?.map(({ name, group }) => (
          <div key={name}>{name}</div>
        ))}
      </div>
      <div>
        <NewBlockButton onClick={onNewBlockButtonClick} />
      </div>
    </>
  );
};

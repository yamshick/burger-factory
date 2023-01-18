import { Header } from "./nav-header/header";
import { NewBlockButton } from "./new-block-button/new-block-button";
import { modalSlice } from "../../../store/reducers/modal-slice";
import { useDispatch, useSelector } from "react-redux";
import styles from "./page-receipts.module.scss";
import CloseCross from "./close-cross.svg";
import { blocksSlice } from "../../../store/reducers/blocks-slice";
export const PageReceipts = () => {
  const { receiptBlocks } = useSelector((state) => state.blocksReducer);
  const { setIsOpen } = modalSlice.actions;
  const { removeBlock } = blocksSlice.actions;
  const dispatch = useDispatch();

  const onNewBlockButtonClick = () => dispatch(setIsOpen(true));

  return (
    <>
      <Header />
      <div>
        {receiptBlocks?.map(({ name, id, group }) => (
          <div key={id} className={styles.receiptBlockHeader}>
            {name}
            <CloseCross onClick={() => dispatch(removeBlock(id))} />
          </div>
        ))}
      </div>
      <div>
        <NewBlockButton onClick={onNewBlockButtonClick} />
      </div>
    </>
  );
};

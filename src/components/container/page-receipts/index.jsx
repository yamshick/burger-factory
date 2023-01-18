import { Header } from "./nav-header/header";
import { NewBlockButton } from "./new-block-button/new-block-button";

export const PageReceipts = () => {
  const receiptBlocks = [];
  return (
    <>
      <Header />
      <div>RECEIPTS</div>
      <div>
        <NewBlockButton onClick={console.log} />
      </div>
    </>
  );
};

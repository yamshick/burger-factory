import { Header } from "./nav-header/header";
import { useSelector } from "react-redux";
import { CookingTimeTab } from "./receipts-tabs/cooking-time-tab";
import { ServingTab } from "./receipts-tabs/servingTab";
import { BlocksTab } from "./receipts-tabs/blocks-tab";
export const ReceiptTabsBar = () => {
  const { activeHeaderNavItem } = useSelector(
    (state) => state.headerNavReducer
  );

  return (
    <>
      <Header />
      {activeHeaderNavItem.id === 1 && <BlocksTab />}
      {activeHeaderNavItem.id === 2 && <CookingTimeTab />}
      {activeHeaderNavItem.id === 3 && <ServingTab />}
    </>
  );
};

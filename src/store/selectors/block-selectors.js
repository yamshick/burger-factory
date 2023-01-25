import { createDraftSafeSelector } from "@reduxjs/toolkit";
import { blockItemsTypes } from "../../app-constants";

const selectSelf = (state) => state.blocksReducer;

const getBlocks = createDraftSafeSelector(
  selectSelf,
  ({ receiptBlocks }) => receiptBlocks
);

// const getCheckedBlocksIds = createDraftSafeSelector(
//   selectSelf,
//   ({ checkedBlocks }) => checkedBlocks
// );
const getCheckedBlockItemsIds = createDraftSafeSelector(
  selectSelf,
  ({ checkedBlockItems }) => checkedBlockItems
);
const getCheckedBlockSubItemsIds = createDraftSafeSelector(
  selectSelf,
  ({ checkedBlockSubItems }) => checkedBlockSubItems
);

// const getCheckedBlocks = createDraftSafeSelector([getBlocks, getCheckedBlocksIds], (blocks, checkedBlockIds) => {
//     return blocks.filter(({id}) => checkedBlockIds.includes(id))
// })

const getCheckedIngredients = createDraftSafeSelector(
  [getBlocks, getCheckedBlockItemsIds, getCheckedBlockSubItemsIds],
  (blocks, checkedBlockItemsIds, checkedBlockSubItemsIds) => {
    const res = [];
    blocks.forEach((block) => {
      block?.items.forEach((item) => {
        if (
          item.type === blockItemsTypes.INGREDIENT &&
          checkedBlockItemsIds.includes(item.id)
        ) {
          res.push(item);
          return;
        }

        item?.subItems?.forEach((subItem) => {
          if (checkedBlockSubItemsIds.includes(subItem.id)) {
            res.push(subItem);
          }
        });
      });
    });
    return res;
  }
);

export const getIngredientsTotalCount = createDraftSafeSelector(
  getCheckedIngredients,
  (checkedIngredients) => {
    return checkedIngredients.length;
  }
);

export const getIngredientsTotalWeight = createDraftSafeSelector(
  getCheckedIngredients,
  (checkedIngredients) => {
    console.log(checkedIngredients);
    return checkedIngredients.reduce((acc, cur) => {
      console.log(cur.weight);
      return acc + Number(cur.weight);
    }, 0);
  }
);

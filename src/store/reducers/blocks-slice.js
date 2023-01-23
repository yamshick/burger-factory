import { createSlice } from "@reduxjs/toolkit";
import { localStorageStateManager } from "../../local-storage/local-storage";

const initialState = {
  // whole app starting uniqueId
  // before localStorage init
  uniqueId: 0,
  receiptBlocks: [],
  // selectedBlockId: null,
  selectedGroupIds: {},
  selectedIngredientIds: [],
};

export const blocksSlice = createSlice({
  name: "blocks",
  initialState: localStorageStateManager.value.blocksReducer || initialState,
  reducers: {
    addBlock(state, action) {
      const { name, snackId } = action.payload;
      state.receiptBlocks.push({
        id: state.uniqueId++,
        name,
        snackId,
        items: [],
      });
    },
    removeBlock(state, action) {
      const index = state.receiptBlocks.findIndex(
        ({ id }) => id === action.payload
      );
      if (index > -1) {
        state.receiptBlocks.splice(index, 1);
      }
    },
    addBlockItem(state, action) {
      const { blockId, blockItem } = action.payload;
      const block = state.receiptBlocks.find(
        (receipt) => receipt.id === blockId
      );

      if (block) {
        block.items.push({
          ...blockItem,
          id: state.uniqueId++,
        });
      }
    },

    removeBlockItem(state, action) {
      const { blockId, blockItemId } = action.payload;
      const block = state.receiptBlocks.find(({ id }) => id === blockId);
      if (!block) return;

      const itemIndex = block.items.findIndex(({ id }) => id === blockItemId);
      if (itemIndex > -1) {
        block.items.splice(itemIndex, 1);
      }
    },

    setBlockItems(state, action) {
      const { blockId, blockItems } = action.payload;
      const block = state.receiptBlocks.find(({ id }) => blockId === id);
      if (!block) return;

      block.items = blockItems;
    },

    updateBlockItem(state, action) {
      const { blockId, blockItemId, data } = action.payload;
      const block = state.receiptBlocks.find(({ id }) => id === blockId);
      const blockIndex = state.receiptBlocks.indexOf(block);

      if (blockIndex === -1) return;

      const group = state.receiptBlocks[blockIndex].items.find(
        ({ id }) => id === blockItemId
      );

      for (let key in data) {
        group[key] = data[key];
      }
    },

    selectBlockItem(state, action) {
      const { blockId, blockItemId } = action.payload;
      if (state.selectedGroupIds[blockId]) {
        state.selectedGroupIds[blockId].push(blockItemId);
      } else {
        state.selectedGroupIds[blockId] = [blockItemId];
      }
    },

    unSelectBlockItem(state, action) {
      const { blockId, blockItemId } = action.payload;
      const index = state.selectedGroupIds[blockId]?.indexOf(blockItemId);
      if (index > -1) {
        state.selectedGroupIds[blockId].splice(index, 1);
      }
      if (state.selectedGroupIds[blockId]?.length === 0) {
        delete state.selectedGroupIds[blockId];
      }
    },

    selectAllBlockItems(state, action) {
      const { blockId } = action.payload;
      const block = state.receiptBlocks.find(({ id }) => id === blockId);
      if (!block.items?.length) return;

      state.selectedGroupIds[blockId] = [];
      block.items.forEach(({ id }) => state.selectedGroupIds[blockId].push(id));
      // state.selectedBlockId = null
    },

    // unSelectAllGroups(state) {
    //   state.selectedGroupIds = {};
    //   state.selectedBlockId = null;
    //   state.selectedIngredientIds = [];
    // },

    resetBlockItemsSelection(state) {
      const blockId = Object.keys(state.selectedGroupIds)[0];
      if (!blockId) return;

      delete state.selectedGroupIds[blockId];
    },

    removeSelectedBlockItems(state) {
      const blockId = Object.keys(state.selectedGroupIds)[0];
      if (!blockId) return;

      const block = state.receiptBlocks.find(
        ({ id }) => id === Number(blockId)
      );
      if (!block) return;

      block.items = block.items.filter(
        ({ id }) => !state.selectedGroupIds[blockId].includes(id)
      );

      state.selectedGroupIds = {};
    },

    copySelectedBlockItems(state) {
      const blockId = Object.keys(state.selectedGroupIds)[0];
      if (!blockId) return;

      const block = state.receiptBlocks.find(
        ({ id }) => id === Number(blockId)
      );
      if (!block) return;

      const newBlockItems = [];
      state.selectedGroupIds[blockId].forEach((groupId) => {
        const blockItem = block.items.find(({ id }) => id === groupId);
        newBlockItems.push({ ...blockItem, id: state.uniqueId++ });
      });
      const newBlock = {
        id: state.uniqueId++,
        name: "Новый блок",
        snackId: block.snackId,
        items: newBlockItems,
      };
      state.receiptBlocks.push(newBlock);

      state.selectedGroupIds = {};
    },

    addIngredient(state, action) {
      const { blockId, blockItemId, ingredient } = action.payload;
      const block = state.receiptBlocks.find(({ id }) => id === blockId);
      if (!block) return;

      const newIngredient = {
        id: state.uniqueId++,
        ingredientGroupId: Number(blockItemId),
        ...ingredient,
      };

      const parentBlockItem = block.items.find(
        ({ id }) => id === Number(blockItemId)
      );
      if (!parentBlockItem) {
        block.items.push(newIngredient);
        return;
      }

      if (!parentBlockItem.ingredients) {
        parentBlockItem.ingredients = [newIngredient];
      } else {
        parentBlockItem.ingredients.push(newIngredient);
      }
    },

    removeIngredient(state, action) {
      const { blockId, blockItemId, ingredientId } = action.payload;

      const block = state.receiptBlocks.find(({ id }) => id === blockId);
      if (!block) return;

      const parentBlockItem = block.items.find(
        ({ id }) => id === Number(blockItemId)
      );
      if (!parentBlockItem) return;

      const ingredientIndex = parentBlockItem.ingredients.findIndex(
        ({ id }) => id === ingredientId
      );
      if (ingredientIndex > -1) {
        parentBlockItem.ingredients.splice(ingredientIndex, 1);
      }
    },
  },
});

export const { reducer } = blocksSlice;

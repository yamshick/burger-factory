import { createSlice } from "@reduxjs/toolkit";
import { localStorageStateManager } from "local-storage/local-storage";

const initialState = {
  // whole app starting uniqueId
  // before localStorage init
  uniqueId: 0,
  receiptBlocks: [],
  checkedBlockId: null,
  checkedBlockItems: [],
  checkedBlockSubItems: [],

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

      const blockItem = state.receiptBlocks[blockIndex].items.find(
        ({ id }) => id === blockItemId
      );

      for (let key in data) {
        blockItem[key] = data[key];
      }
    },

    updateBlockSubItem(state, action) {
      const { blockId, blockItemId, blockSubItemId, data } = action.payload;

      const block = state.receiptBlocks.find(({ id }) => id === blockId);
      if (!block) return;

      const blockItem = block.items.find(({ id }) => id === blockItemId);
      if (!blockItem) return;

      const blockSubItem = blockItem.subItems.find(
        ({ id }) => id === blockSubItemId
      );
      if (!blockSubItem) return;

      for (let key in data) {
        blockSubItem[key] = data[key];
      }
    },

    selectBlockItem(state, action) {
      const { blockId, blockItemId } = action.payload;
      const block = state.receiptBlocks.find(({id}) => id === blockId);
      if (!block) return;

      const blockItem = block.items.find(({id}) => id === blockItemId);
      if (!blockItem) return;

      state.checkedBlockItems.push(blockItemId)
      blockItem?.subItems?.forEach(({id}) => state.checkedBlockSubItems.push(id));
    },

    unSelectBlockItem(state, action) {
      const { blockId, blockItemId } = action.payload;
      const block = state.receiptBlocks.find(({id}) => id === blockId);
      if (!block) return;

      const blockItem = block.items.find(({id}) => id === blockItemId);
      if (!blockItem) return;

      state.checkedBlockItems = state.checkedBlockItems.filter(id => id !== blockItemId)
      blockItem?.subItems?.forEach(({id}) => {
        state.checkedBlockSubItems = state.checkedBlockSubItems.filter(subItemId => subItemId !== id)
      });
    },

    selectAllBlockItems(state, action) {
      const { blockId } = action.payload;
      const block = state.receiptBlocks.find(({id}) => id === blockId);
      if (!block) return;

      state.checkedBlockId = blockId;
      block?.items?.forEach(({id, subItems}) => {
        state.checkedBlockItems.push(id);
        subItems?.forEach(({id}) => state.checkedBlockSubItems.push(id));
      });
    },

    resetCheckboxes(state) {
      state.checkedBlockId = null;
      state.checkedBlockItems = [];
      state.checkedBlockSubItems = [];
    },

    // TODO: resetAllBlockCheckboxes
    resetBlockItemSelection(state, action) {
      const {blockId} = action.payload;
      const block = state.receiptBlocks.find(({id}) => id === blockId);
      if (!block) return;

      block?.items?.forEach(({id, subItems}) => {
        state.checkedBlockItems = state.checkedBlockItems.filter(itemId => itemId !== id);
        subItems?.forEach(({id}) => state.checkedBlockSubItems = state.checkedBlockSubItems.filter(itemId => itemId !== id));
      });
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

      if (!parentBlockItem.subItems) {
        parentBlockItem.subItems = [newIngredient];
      } else {
        parentBlockItem.subItems.push(newIngredient);
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

      const ingredientIndex = parentBlockItem.subItems.findIndex(
        ({ id }) => id === ingredientId
      );
      if (ingredientIndex > -1) {
        parentBlockItem.subItems.splice(ingredientIndex, 1);
      }
    },
  },
});

export const { reducer } = blocksSlice;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // whole app starting uniqueId
  // before localStorage init
  uniqueId: 12,
  receiptBlocks: [],
  selectedGroupIds: {},
  selectedIngredientIds: [],
};

export const blocksSlice = createSlice({
  name: "blocks",
  initialState,
  reducers: {
    addBlock(state, action) {
      const { name, snackId } = action.payload;
      state.receiptBlocks.push({
        id: state.uniqueId++,
        name,
        snackId,
        groups: [],
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
    addGroup(state, action) {
      const { blockId, group } = action.payload;
      const block = state.receiptBlocks.find(
        (receipt) => receipt.id === blockId
      );

      if (block) {
        block.groups.push({
          ...group,
          id: state.uniqueId++,
        });
      }
    },

    removeGroup(state, action) {
      const { blockId, groupId } = action.payload;
      const block = state.receiptBlocks.find(({ id }) => id === blockId);
      if (!block) return;

      const groupIndex = block.groups.findIndex(({ id }) => id === groupId);
      if (groupIndex > -1) {
        block.groups.splice(groupIndex, 1);
      }
    },

    updateGroupName(state, action) {
      const { blockId, groupId, groupName } = action.payload;
      const block = state.receiptBlocks.find(
        (receipt) => receipt.id === blockId
      );
      const blockIndex = state.receiptBlocks.indexOf(block);

      if (blockIndex === -1) return;

      const group = state.receiptBlocks[blockIndex].groups.find(
        (group) => group.id === groupId
      );
      group.name = groupName;
    },

    selectGroup(state, action) {
      const { blockId, groupId } = action.payload;
      if (state.selectedGroupIds[blockId]) {
        state.selectedGroupIds[blockId].push(groupId);
      } else {
        state.selectedGroupIds[blockId] = [groupId];
      }
    },

    unSelectGroup(state, action) {
      const { blockId, groupId } = action.payload;
      const index = state.selectedGroupIds[blockId]?.indexOf(groupId);
      if (index > -1) {
        state.selectedGroupIds[blockId].splice(index, 1);
      }
      if (state.selectedGroupIds[blockId]?.length === 0) {
        delete state.selectedGroupIds[blockId];
      }
    },

    selectAllGroups(state, action) {
      const { blockId } = action.payload;
      const block = state.receiptBlocks.find(
        (receipt) => receipt.id === blockId
      );
      if (!block.groups?.length) return;

      state.selectedGroupIds[blockId] = [];
      block.groups.forEach(({ id }) =>
        state.selectedGroupIds[blockId].push(id)
      );
    },

    resetGroupSelection(state) {
      const blockId = Object.keys(state.selectedGroupIds)[0];
      if (!blockId) return;

      delete state.selectedGroupIds[blockId];
    },

    removeSelectedGroups(state) {
      const blockId = Object.keys(state.selectedGroupIds)[0];
      if (!blockId) return;

      const block = state.receiptBlocks.find(
        ({ id }) => id === Number(blockId)
      );
      if (!block) return;

      block.groups = block.groups.filter(
        ({ id }) => !state.selectedGroupIds[blockId].includes(id)
      );

      state.selectedGroupIds = {};
    },

    copySelectedGroups(state) {
      const blockId = Object.keys(state.selectedGroupIds)[0];
      if (!blockId) return;

      const block = state.receiptBlocks.find(
        ({ id }) => id === Number(blockId)
      );
      if (!block) return;

      const newGroups = [];
      state.selectedGroupIds[blockId].forEach((groupId) => {
        const group = block.groups.find(({ id }) => id === groupId);
        newGroups.push({ ...group, id: state.uniqueId++ });
      });
      const newBlock = {
        id: state.uniqueId++,
        name: "Новый блок",
        snackId: block.snackId,
        groups: newGroups,
      };
      state.receiptBlocks.push(newBlock);

      state.selectedGroupIds = {};
    },

    addIngredient(state, action) {
      const { blockId, groupId, ingredient } = action.payload;
      const block = state.receiptBlocks.find(({ id }) => id === blockId);
      if (!block) return;

      const newIngredient = { id: state.uniqueId++, ...ingredient };

      const group = block.groups.find(({ id }) => id === Number(groupId));
      if (!group) {
        block.groups.push(newIngredient);
        return;
      }

      if (!group.ingredients) {
        group.ingredients = [newIngredient];
      } else {
        group.ingredients.push(newIngredient);
      }
    },

    removeIngredient(state, action) {
      const { blockId, groupId, ingredientId } = action.payload;

      const block = state.receiptBlocks.find(({ id }) => id === blockId);
      if (!block) return;

      const group = block.groups.find(({ id }) => id === Number(groupId));
      if (!group) return;

      const ingredientIndex = group.ingredients.findIndex(
        ({ id }) => id === ingredientId
      );
      if (ingredientIndex > -1) {
        group.ingredients.splice(ingredientIndex, 1);
      }
    },

    setWholeState(state, action) {
      Object.keys(state).forEach((key) => {
        state[key] = action.payload[key];
      });
    },
  },
});

export const { reducer } = blocksSlice;

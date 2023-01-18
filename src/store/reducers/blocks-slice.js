import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  receiptBlocks: [],
};

export const blocksSlice = createSlice({
  name: "blocks",
  initialState,
  reducers: {
    addBlock(state, action) {
      state.receiptBlocks.push({
        name: action.payload,
        id: Date.now(),
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
      const { blockId, groupName } = action.payload;
      const block = state.receiptBlocks.find(
        (receipt) => receipt.id === blockId
      );

      if (block) {
        block.groups.push({
          id: Date.now(),
          name: groupName,
        });
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

    setWholeState(state, action) {
      Object.keys(state).forEach((key) => {
        state[key] = action.payload[key];
      });
    },
  },
});

export const { reducer } = blocksSlice;

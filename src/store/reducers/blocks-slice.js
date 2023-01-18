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
  },
});

export const { reducer } = blocksSlice;

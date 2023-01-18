import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  receiptBlocks: [],
};

export const blocksSlice = createSlice({
  name: "blocks",
  initialState,
  reducers: {
    addBlock(state, action) {
      console.log({ action });
      state.receiptBlocks.push({ name: action.payload, groups: [] });
    },
  },
});

export const { reducer } = blocksSlice;

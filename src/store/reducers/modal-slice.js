import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isNewBlockModalOpen: false,
  isNewGroupModalOpen: false,
  addGroupModalData: null,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setIsNewBlockModalOpen(state, action) {
      state.isNewBlockModalOpen = action.payload;
    },
    setIsNewGroupModalOpen(state, action) {
      state.isNewGroupModalOpen = action.payload;
    },
    setWholeState(state, action) {
      Object.keys(state).forEach((key) => {
        state[key] = action.payload[key];
      });
    },
    setAddGroupModalData(state, action) {
      state.addGroupModalData = action.payload;
    },
    resetAddGroupModalData(state) {
      state.addGroupModalData = null;
    }
  },
});

export const { reducer } = modalSlice;

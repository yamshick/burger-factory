import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isNewBlockModalOpen: false,
  isNewGroupModalOpen: false,
  isAddIngredientsModalOpen: false,
  addGroupModalData: null,
  addIngredientsModalData: null,
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
    setIsAddIngredientsModalOpen(state, action) {
      state.isAddIngredientsModalOpen = action.payload;
    },
    setAddGroupModalData(state, action) {
      state.addGroupModalData = action.payload;
    },
    setAddIngredientModalData(state, action) {
      state.addIngredientsModalData = action.payload;
    },
    resetAddGroupModalData(state) {
      state.addGroupModalData = null;
    },
    resetAddIngredientModalData(state) {
      state.addIngredientsModalData = null;
    },
    setWholeState(state, action) {
      Object.keys(state).forEach((key) => {
        state[key] = action.payload[key];
      });
    },
  },
});

export const { reducer } = modalSlice;

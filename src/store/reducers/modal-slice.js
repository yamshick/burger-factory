import { createSlice } from "@reduxjs/toolkit";
import { localStorageStateManager } from "local-storage/local-storage";

const initialState = {
  isNewBlockModalOpen: false,
  isNewGroupModalOpen: false,
  isAddIngredientsModalOpen: false,
  addGroupModalData: null,
  addIngredientsModalData: null,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState: localStorageStateManager.value.modalReducer || initialState,
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
  },
});

export const { reducer } = modalSlice;

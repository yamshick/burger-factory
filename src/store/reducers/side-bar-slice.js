import { createSlice } from "@reduxjs/toolkit";
import { LOCAL_STORAGE_STATE } from "../../app-constants";

const initialState = {
  isSideBarOpen: true,
  dropDownActiveItem: null,
  dropDownActiveSubItem: null,
};

export const sideBarSlice = createSlice({
  name: "sideBar",
  initialState: LOCAL_STORAGE_STATE.sideBarReducer || initialState,
  reducers: {
    setIsSideBarOpen(state, action) {
      state.isSideBarOpen = action.payload;
    },
    setDropDownActiveItem(state, action) {
      state.dropDownActiveItem = action.payload;
    },
    setDropDownActiveSubItem(state, action) {
      state.dropDownActiveSubItem = action.payload;
    },
    reset(state) {
      state.dropDownActiveItem = null;
      state.dropDownActiveSubItem = null;
    },
  },
});

export const { reducer } = sideBarSlice;

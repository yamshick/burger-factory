import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSideBarOpen: false,
  dropDownActiveItem: null,
  dropDownActiveSubItem: null,
};

export const sideBarSlice = createSlice({
  name: "sideBar",
  initialState,
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
    setWholeState(state, action) {
      Object.keys(state).forEach((key) => {
        console.log({ key, "a.p.k": action.payload[key] });
        state[key] = action.payload[key];
      });
    },
  },
});

export const { reducer } = sideBarSlice;

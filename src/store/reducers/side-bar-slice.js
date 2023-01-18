import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dropDownActiveItem: "",
  dropDownActiveSubItem: "",
};

export const sideBarSlice = createSlice({
  name: "sideBar",
  initialState,
  reducers: {
    setDropDownActiveItem(state, action) {
      state.dropDownActiveItem = action.payload;
    },
    setDropDownActiveSubItem(state, action) {
      state.dropDownActiveSubItem = action.payload;
    },
    reset(state) {
      state.dropDownActiveItem = "";
      state.dropDownActiveSubItem = "";
    },
  },
});

export const { reducer } = sideBarSlice;

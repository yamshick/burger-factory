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
    setWholeState(state, action) {
      Object.keys(state).forEach((key) => {
        state[key] = action.payload[key];
      });
    },
  },
});

export const { reducer } = sideBarSlice;

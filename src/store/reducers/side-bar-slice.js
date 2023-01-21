import { createSlice } from "@reduxjs/toolkit";
import { LOCAL_STORAGE_STATE, snacksCategories } from "../../app-constants";

const initialState = {
  isSideBarOpen: true,
  dropDownOpenItems: [],
  dropDownActiveItem: snacksCategories[1],
  dropDownActiveSubItem: snacksCategories[1].snacks[0],
};

export const sideBarSlice = createSlice({
  name: "sideBar",
  initialState: LOCAL_STORAGE_STATE.sideBarReducer || initialState,
  reducers: {
    setIsSideBarOpen(state, action) {
      state.isSideBarOpen = action.payload;
    },
    toggleDropDownActiveItem(state, action) {
      const item = action.payload;
      const itemIndex = state.dropDownOpenItems.findIndex(
        ({ id }) => id === item.id
      );
      if (itemIndex > -1) {
        state.dropDownOpenItems.splice(itemIndex, 1);
      } else {
        state.dropDownOpenItems.push(item);
      }
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

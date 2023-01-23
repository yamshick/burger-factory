import { createSlice } from "@reduxjs/toolkit";
import { snacksCategories } from "../../app-constants";
import { localStorageStateManager } from "local-storage/local-storage";

const initialState = {
  isSideBarOpen: true,
  dropDownOpenItems: [],
  dropDownActiveItem: snacksCategories[1],
  dropDownActiveSubItem: snacksCategories[1].snacks[0],
};

export const sideBarSlice = createSlice({
  name: "sideBar",
  initialState: localStorageStateManager.value?.sideBarReducer || initialState,
  reducers: {
    setIsSideBarOpen(state, action) {
      state.isSideBarOpen = action.payload;
    },
    toggleDropDownActiveItem(state, action) {
      const item = action.payload;
      const itemIndex = state.dropDownOpenItems?.findIndex(
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

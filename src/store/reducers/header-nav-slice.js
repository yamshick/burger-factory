import { createSlice } from "@reduxjs/toolkit";
import { headerNavItems } from "../../app-constants";
import { localStorageStateManager } from "local-storage/local-storage";

const initialState = {
  activeHeaderNavItem: headerNavItems[0],
};

export const headerNavSlice = createSlice({
  name: "sideBar",
  initialState: localStorageStateManager.value.headerNavReducer || initialState,
  reducers: {
    setActiveHeaderNavItem(state, action) {
      state.activeHeaderNavItem = action.payload;
    },
  },
});

export const { reducer } = headerNavSlice;

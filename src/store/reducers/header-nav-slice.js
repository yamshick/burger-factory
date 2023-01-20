import { createSlice } from "@reduxjs/toolkit";
import { headerNavItems, LOCAL_STORAGE_STATE } from "../../app-constants";

const initialState = {
  activeHeaderNavItem: headerNavItems[0],
};

export const headerNavSlice = createSlice({
  name: "sideBar",
  initialState: LOCAL_STORAGE_STATE.headerNavReducer || initialState,
  reducers: {
    setActiveHeaderNavItem(state, payload) {
      state.activeHeaderNavItem = payload;
    },
  },
});

export const { reducer } = headerNavSlice;

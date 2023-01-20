import { createSlice } from "@reduxjs/toolkit";
import {headerNavItems} from "../../app-constants";

const initialState = {
  activeHeaderNavItem: headerNavItems[0],
};

export const headerNavSlice = createSlice({
  name: "sideBar",
  initialState,
  reducers: {
    setActiveHeaderNavItem(state, payload) {
      state.activeHeaderNavItem = payload;
    },
    setWholeState(state, action) {
      Object.keys(state).forEach((key) => {
        state[key] = action.payload[key];
      });
    },
  },
});

export const { reducer } = headerNavSlice;

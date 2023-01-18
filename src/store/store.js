import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { reducer as sideBarReducer } from "./reducers/side-bar-slice";

const rootReducer = combineReducers({
  sideBarReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

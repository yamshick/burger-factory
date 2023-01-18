import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { reducer as sideBarReducer } from "./reducers/side-bar-slice";
import { reducer as blocksReducer } from "./reducers/blocks-slice";
import { reducer as modalReducer } from "./reducers/modal-slice";

const rootReducer = combineReducers({
  sideBarReducer,
  blocksReducer,
  modalReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

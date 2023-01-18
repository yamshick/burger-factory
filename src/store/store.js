import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { reducer as sideBarReducer } from "./reducers/side-bar-slice";
import { reducer as blocksReducer } from "./reducers/blocks-slice";
import { reducer as modalReducer } from "./reducers/modal-slice";

const rootReducer = combineReducers({
  sideBarReducer,
  blocksReducer,
  modalReducer,
});

const logMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  console.log(action);
  localStorage.setItem("state", JSON.stringify(store.getState()));
  return result;
};
export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(logMiddleware),
  });
};

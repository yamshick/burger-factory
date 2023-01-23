import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { reducer as sideBarReducer } from "./reducers/side-bar-slice";
import { reducer as blocksReducer } from "./reducers/blocks-slice";
import { reducer as modalReducer } from "./reducers/modal-slice";
import { reducer as headerNavReducer } from "./reducers/header-nav-slice";
import { LOCAL_STORAGE_STATE_KEY } from "local-storage/local-storage";

const rootReducer = combineReducers({
  blocksReducer,
  modalReducer,
  headerNavReducer,
  sideBarReducer,
});
const localStorageMiddleware = (store) => (next) => (action) => {
  console.log(action);
  const result = next(action);
  localStorage.setItem(
    LOCAL_STORAGE_STATE_KEY,
    JSON.stringify(store.getState())
  );
  return result;
};
export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(localStorageMiddleware),
  });
};

import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./app";
import { setupStore } from "./store/store";
import { Provider } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

const store = setupStore();

root.render(
  <DndProvider backend={HTML5Backend}>
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>
  </DndProvider>
);

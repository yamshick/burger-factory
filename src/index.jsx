import { createRoot } from "react-dom/client";
import { App } from "./app";
import { setupStore } from "./store/store";
import { Provider } from "react-redux";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

const store = setupStore();

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

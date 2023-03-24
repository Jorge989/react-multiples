import React from "react";
import ReactDOM from "react-dom/client";
import { store } from "./store"; // your Redux store
import Root from "./root.component";
import { Provider } from "react-redux";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Root />
    </Provider>
  </React.StrictMode>
);

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import Store from "./store";

/* Store.subscribe(() => {
  console.log(Store.getState())
}) */


const AppWrapper = () => {
  return (
    <Provider store={Store}>
      <App />
    </Provider>
  );
};

ReactDOM.render(<AppWrapper />, document.getElementById("app"));

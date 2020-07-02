import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { StylesProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    <StylesProvider injectFirst>
      <App />
    </StylesProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

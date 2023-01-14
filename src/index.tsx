import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { ThemeProvider } from "styled-components";

const darkTheme = {
  textColor: "whitesmoke",
  backgroundColor: "#111",
};

const lightTheme = {
  textColor: "#111",
  backgroundColor: "whitesmoke",
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  /**
   * ThemProvider 에 App이 들어있으므로 component 안에서 darkTheme 과 lightTheme에 대해 접근 가능
   */
  <ThemeProvider theme={lightTheme}>
    <App />
  </ThemeProvider>
);

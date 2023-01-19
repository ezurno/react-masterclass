import ReactDOM from "react-dom/client";
import { ThemeProvider } from "styled-components";
import App from "./App";
import { theme } from "./theme";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  /**
   * ThemProvider 에 App이 들어있으므로 component 안에서 darkTheme 과 lightTheme에 대해 접근 가능
   */
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
);

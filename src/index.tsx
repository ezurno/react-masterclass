import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider } from "styled-components";
import App from "./App";
import { theme } from "./theme";

const queryClient = new QueryClient(); // react-query를 위한 객체 생성

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  /**
   * ThemProvider 에 App이 들어있으므로 component 안에서 darkTheme 과 lightTheme에 대해 접근 가능
   * QueryClientProvider로 감싸주어야 함
   */
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </QueryClientProvider>
);

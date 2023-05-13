import React from "react";
import ReactDOM from "react-dom/client";
// ------
import { theme } from "./utils/styles";
import "./index.css";
import App from "./App";
import { ThemeProvider } from "@emotion/react";
import { store } from "./utils/store";
import { Provider } from "react-redux";
import ErrorBoundary from "./global/components/ErrorHandle";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <ErrorBoundary>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </ErrorBoundary>
    </ThemeProvider>
  </Provider>
);

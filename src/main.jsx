import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { DisplayGate, SDKProvider } from "@tma.js/sdk-react";
import LoadingScreen from "./components/LoadingScreen";
import ErrorBoundary, { ErrorBoundaryError } from "./ErrorBoundary.jsx";

const options = {
  acceptCustomStyles: true,
  cssVars: true,
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary fallback={ErrorBoundaryError}>
      <SDKProvider options={options}>
        <DisplayGate
          error={LoadingScreen}
          loading={LoadingScreen}
          initial={LoadingScreen}
        >
          <App />
        </DisplayGate>
      </SDKProvider>
    </ErrorBoundary>
  </React.StrictMode>
);

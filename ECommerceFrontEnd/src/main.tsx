import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import store, { persistor } from "./app/store.ts";
import { ThemeProvider } from "./context/ThemeContext.tsx";
import { PersistGate } from "redux-persist/integration/react";
import { AuthDialogProvider } from "./context/AuthDialogContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider storageKey="theme">
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <AuthDialogProvider>
            <App />
          </AuthDialogProvider>
        </PersistGate>
      </Provider>
    </ThemeProvider>
  </StrictMode>
);

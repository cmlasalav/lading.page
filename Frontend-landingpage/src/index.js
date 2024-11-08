import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { LangProvider } from "./context/langContext";
import { AuthProvider } from "./context/authContext";
import { ErrorProvider } from "./context/errorContext";
import { UserProvider } from "./context/userContext";
import { ViewProvider } from "./context/viewContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <UserProvider>
      <ViewProvider>
        <ErrorProvider>
          <LangProvider>
            <App />
          </LangProvider>
        </ErrorProvider>
      </ViewProvider>
    </UserProvider>
  </AuthProvider>
);

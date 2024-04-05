import React from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import App from "./App";
import { TransactionProvider } from './context/TransactionContext';

// Usar createRoot en lugar de ReactDOM.render
const root = createRoot(document.getElementById("root"));

root.render(
  <TransactionProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </TransactionProvider>
);

import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Factory } from './components/Factory';
import { Farm } from './components/Farm';
import { Home } from './components/Home';
import { Points } from './components/Points';
import { Admin } from './components/Admin';


import "./index.css";
import App from "./App";
import { TransactionProvider } from './context/TransactionContext';

// Usar createRoot en lugar de ReactDOM.render
const root = createRoot(document.getElementById("root"));

root.render(
  <TransactionProvider>
    <React.StrictMode>
      <BrowserRouter>
        <App/>
        <Routes>

          <Route path="/" element={<Home/>} />
          <Route path="/Factory" element={<Factory/>} />
          <Route path="/Farm" element={<Farm/>} />
          <Route path="/Points" element={<Points/>} />
          <Route path="/Admin" element={<Admin/>} />

        
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  </TransactionProvider>
);

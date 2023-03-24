import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CurrentUserContextProvider } from "./contexts/userContext";

import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <CurrentUserContextProvider>
    <BrowserRouter>
      <React.StrictMode>
        <App />
        <ToastContainer autoClose={1000} />
      </React.StrictMode>
    </BrowserRouter>
  </CurrentUserContextProvider>
);

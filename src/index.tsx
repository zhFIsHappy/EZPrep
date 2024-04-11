import React, { createContext, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CategoryContextProvider } from "./contexts/CategoryContext";
import { CartContextProvider } from "./contexts/CartContext";
import "./assets/css/global.css";
import {InterviewContextProvider} from "./contexts/InterviewContext";
import {RegisterContextProvider} from "./contexts/RegisterContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    {/* <CategoryContextProvider>
            <CartContextProvider> */}
    <InterviewContextProvider>
      <RegisterContextProvider>
        <App />
      </RegisterContextProvider>
    </InterviewContextProvider>

    {/* </CartContextProvider>
        </CategoryContextProvider> */}
  </React.StrictMode>
);

import React, {createContext, useEffect, useState} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {CategoryContextProvider} from "./contexts/CategoryContext";


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <CategoryContextProvider>
          <App/>
      </CategoryContextProvider>
  </React.StrictMode>
);

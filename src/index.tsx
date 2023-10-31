import React, {createContext, useEffect, useState} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {CategoryContextProvider} from "./contexts/CategoryContext";
import {CartContextProvider} from "./contexts/CartContext";


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <CategoryContextProvider>
            <CartContextProvider>
                <App/>
            </CartContextProvider>
        </CategoryContextProvider>
    </React.StrictMode>
);

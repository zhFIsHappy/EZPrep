import {createContext, Dispatch, useReducer} from "react";
import {cartReducer, CartTypes} from "../reducers/CartReducer";
import {ShoppingCartItem} from "../types";

const initialCartState: ShoppingCartItem[] = [];

export const CartContext = createContext<{
    cart: ShoppingCartItem[];
    dispatch: Dispatch<any>;
}>({
    cart: initialCartState,
    dispatch: () => null
});

CartContext.displayName = 'CartContext';

// @ts-ignore
export function CartContextProvider({children}) {
    // Use the useReducer hook to manage the cart state
    // @ts-ignore
    const [cart, dispatch] = useReducer(cartReducer, initialCartState);

    // You can provide any other context values or functions you need here
    return (
        <CartContext.Provider value={{cart, dispatch}}>
            {children}
        </CartContext.Provider>
    );
}
import {BookItem, ShoppingCartItem} from "../types";

export const CartTypes = {
    ADD: 'ADD',
    REMOVE: 'REMOVE',
    CLEAR: 'CLEAR'
};

type AppActions = {
    id: number;
    type: 'ADD' | 'REMOVE' | 'CLEAR';
    item: BookItem;
}

export const cartReducer = (state: ShoppingCartItem[], action: AppActions) => {
    switch (action.type) {
        case CartTypes.ADD:
            /*
                The following only added the item in the cart for the first time with quantity 1.
                You have to handle the increment of the quantity if the item
                is already in the cart
              */
            // let item = state.find((item) => item.id === action.id);
            // console.log(item);
            return [
                ...state,
                {id: action.id, items: action.item, quantity: 1},
            ];
            // console.log(newArr);
            // return newArr;
        case CartTypes.REMOVE:
            /*
               will be defiend in Project 7
             */
            return;
        case CartTypes.CLEAR:
            return;    // will be defined in Project 7
        default:
            throw new Error(`Invalid action type ${action.type}`);
    }
};
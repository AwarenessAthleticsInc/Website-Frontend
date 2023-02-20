import { createSlice } from '@reduxjs/toolkit';
import { cartReducers } from './cartReducers';

const cartInit = {
    cart: {
        items: [],
        totalQty: 0,
        totalPrice: 0,
        totalWeight: 0
    }
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState: cartInit,
    reducers: cartReducers
});
export const cartActions = cartSlice.actions;
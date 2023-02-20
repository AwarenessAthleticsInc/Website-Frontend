import { createSlice } from '@reduxjs/toolkit';
import { orderReducers } from './orderReducers';

const orderInit = {
    orders: []
}

export const orderSlice = createSlice({
    name: 'orders',
    initialState: orderInit,
    reducers: orderReducers
});
export const orderActions = orderSlice.actions;
import { createSlice } from '@reduxjs/toolkit';
import { stockReducers } from './stockReducers';

const stockInit = {
    stock: []
}

export const stockSlice = createSlice({
    name: 'stock',
    initialState: stockInit,
    reducers: stockReducers
});
export const stockActions = stockSlice.actions;
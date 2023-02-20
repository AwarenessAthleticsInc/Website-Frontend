import { createSlice } from '@reduxjs/toolkit';
import { productReducers } from './productReducers';

const productInit = {
    products: []
}

export const productSlice = createSlice({
    name: 'products',
    initialState: productInit,
    reducers: productReducers
});
export const productActions = productSlice.actions;
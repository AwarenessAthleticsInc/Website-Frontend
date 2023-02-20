import { createSlice } from '@reduxjs/toolkit';
import { paymentReducers } from './paymentReducers';

const paymentInit = {
    payments: []
}

export const paymentSlice = createSlice({
    name: 'payments',
    initialState: paymentInit,
    reducers: paymentReducers
});
export const paymentActions = paymentSlice.actions;
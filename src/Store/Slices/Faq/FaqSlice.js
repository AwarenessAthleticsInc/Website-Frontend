import { createSlice } from '@reduxjs/toolkit';
import { FaqReducers } from './FaqReducers';

const FaqInit = {
    Faqs: []
}

export const FaqSlice = createSlice({
    name: 'Faqs',
    initialState: FaqInit,
    reducers: FaqReducers
});
export const FaqActions = FaqSlice.actions;
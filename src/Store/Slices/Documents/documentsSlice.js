import { createSlice } from '@reduxjs/toolkit';
import { documentsReducers } from './documentsReducers';

const documentInit = {
    documents: []
}

export const documentSlice = createSlice({
    name: 'documents',
    initialState: documentInit,
    reducers: documentsReducers
});
export const documentActions = documentSlice.actions;
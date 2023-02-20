import { createSlice } from '@reduxjs/toolkit';
import { loadingReducers } from './loadingReducers';

//code 0 means no message
const loadingInit = {
    loading: {
        finsished: false,
        percentage: 0
    }
}

export const loadingSlice = createSlice({
    name: 'loadings',
    initialState: loadingInit,
    reducers: loadingReducers
});
export const loadingActions = loadingSlice.actions;
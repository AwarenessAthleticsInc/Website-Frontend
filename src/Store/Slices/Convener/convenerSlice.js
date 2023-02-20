import { createSlice } from '@reduxjs/toolkit';
import { convenerReducers } from './convenerReducers';

const convenerInit = {
    tournaments: []
}

export const convenerSlice = createSlice({
    name: 'convener',
    initialState: convenerInit,
    reducers: convenerReducers
});
export const convenerActions = convenerSlice.actions;
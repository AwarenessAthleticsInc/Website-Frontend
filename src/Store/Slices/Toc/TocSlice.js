import { createSlice } from '@reduxjs/toolkit';
import { tocReducers } from './TocReducers';

const tocInit = {
    toc: []
}

export const tocSlice = createSlice({
    name: 'toc',
    initialState: tocInit,
    reducers: tocReducers
});
export const tocActions = tocSlice.actions;
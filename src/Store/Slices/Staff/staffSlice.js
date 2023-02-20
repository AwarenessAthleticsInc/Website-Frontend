import { createSlice } from '@reduxjs/toolkit';
import { staffReducers } from './staffReducers';

const staffInit = {
    staff: []
}

export const staffSlice = createSlice({
    name: 'staff',
    initialState: staffInit,
    reducers: staffReducers
});
export const staffActions = staffSlice.actions;
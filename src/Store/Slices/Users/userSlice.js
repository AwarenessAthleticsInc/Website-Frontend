import { createSlice } from '@reduxjs/toolkit';
import { userReducers } from './userReducers';

const userInit = {
    users: []
}

export const allUserSlice = createSlice({
    name: 'users',
    initialState: userInit,
    reducers: userReducers
});
export const allUserActions = allUserSlice.actions;
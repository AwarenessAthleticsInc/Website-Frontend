import { createSlice } from '@reduxjs/toolkit';
import { registrationReducers } from './registrationReducers';

const registrationInit = {
    registration: []
}

export const registrationSlice = createSlice({
    name: 'registration',
    initialState: registrationInit,
    reducers: registrationReducers
});
export const registrationActions = registrationSlice.actions;
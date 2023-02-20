import { createSlice } from '@reduxjs/toolkit';
import { teamReducers } from './teamReducers';

const teamInit = {
    team: []
}

export const teamSlice = createSlice({
    name: 'team',
    initialState: teamInit,
    reducers: teamReducers
});
export const teamActions = teamSlice.actions;
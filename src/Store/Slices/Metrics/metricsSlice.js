import { createSlice } from '@reduxjs/toolkit';
import { metricsReducers } from './metricsReducers';

const metricsInit = {
    registrationGrowth: [],
    SiteUserGrowth: [],
    TeamGrowth: []
}

export const metricsSlice = createSlice({
    name: 'metrics',
    initialState: metricsInit,
    reducers: metricsReducers
});
export const metricsActions = metricsSlice.actions;
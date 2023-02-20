import { createSlice } from '@reduxjs/toolkit';
import { userReducers } from './userReducters';

const userInit = {
    account: {
        startDate: '',
        username: '',
        name: {
            givenName: '',
            middleName: '',
            familyName: ''
        },
        phone: '',
        DateOfBirth: '',
        roles: '',
        profileImage: '',
        team: {
           name: '',
           status: ''
        },
        active: false,
    },
    orders: [],
    registrations: [],
    payments: [],
    token: '',
    auth: false
}

export const userSlice = createSlice({
    name: 'user',
    initialState: userInit,
    reducers: userReducers
});
export const userActions = userSlice.actions;
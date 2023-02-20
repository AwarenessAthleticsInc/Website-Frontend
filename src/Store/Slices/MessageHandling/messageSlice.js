import { createSlice } from '@reduxjs/toolkit';
import { messageReducers } from './messageReducers';

//code 0 means no message
const messageInit = {
    error: {
      code: 0,
      message: ''
    },
    warning: {
        code: 0,
        message: ''
    },
    success: {
        code: 0,
        message: ''
    },
    info: {
        code: 0,
        message: ''
    }
}

export const messageSlice = createSlice({
    name: 'messages',
    initialState: messageInit,
    reducers: messageReducers
});
export const messageActions = messageSlice.actions;
// const axios = require('axios').default;

export const userReducers = {
    populateArray(state, action) {
        state.users = action.payload;
    },
    clearArray(state) {
        state.users = [];
    }
}
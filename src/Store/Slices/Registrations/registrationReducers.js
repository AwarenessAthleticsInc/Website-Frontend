// const axios = require('axios').default;

export const registrationReducers = {
    populateArray(state, action) {
        state.registration = action.payload;
    },
    clearArray(state) {
        state.registration = [];
    }
}
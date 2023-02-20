// const axios = require('axios').default;

export const paymentReducers = {
    populateArray(state, action) {
        state.payments = action.payload;
    },
    clearArray(state) {
        state.payments = [];
    }
}
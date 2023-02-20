// const axios = require('axios').default;

export const orderReducers = {
    populateArray(state, action) {
        state.orders = action.payload;
    },
    clearArray(state) {
        state.orders = [];
    }
}
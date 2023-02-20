// const axios = require('axios').default;

export const stockReducers = {
    populateArray(state, action) {
        state.stock = action.payload;
    },
    clearArray(state) {
        state.stock = [];
    }
}
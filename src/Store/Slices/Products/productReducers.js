// const axios = require('axios').default;

export const productReducers = {
    populateArray(state, action) {
        state.products = action.payload;
    },
    clearArray(state) {
        state.products = [];
    }
}
// const axios = require('axios').default;

export const cartReducers = {
    populateArray(state, action) {
        if (action.payload === null || action.payload === undefined){
            return;
        }
        state.cart = action.payload;
    },
    clearArray(state) {
        state.cart = {
            items: [],
            totalQty: 0,
            totalPrice: 0,
            totalWeight: 0
        };
    }
}
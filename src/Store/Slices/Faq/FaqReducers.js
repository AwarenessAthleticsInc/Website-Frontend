// const axios = require('axios').default;

export const FaqReducers = {
    populateArray(state, action) {
        state.Faqs = action.payload;
    },
    clearArray(state) {
        state.Faqs = [];
    }
}
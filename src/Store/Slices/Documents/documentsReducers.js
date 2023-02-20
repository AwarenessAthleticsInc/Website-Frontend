// const axios = require('axios').default;

export const documentsReducers = {
    populateArray(state, action) {
        state.documents = action.payload;
    },
    clearArray(state) {
        state.documents = [];
    }
}
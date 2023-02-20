// const axios = require('axios').default;

export const tocReducers = {
    populateArray(state, action) {
        state.toc = action.payload;
    },
    clearArray(state) {
        state.toc = [];
    }
}
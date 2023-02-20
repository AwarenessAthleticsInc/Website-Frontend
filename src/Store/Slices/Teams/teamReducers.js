// const axios = require('axios').default;

export const teamReducers = {
    populateArray(state, action) {
        state.team = action.payload;
    },
    clearArray(state) {
        state.team = [];
    }
}
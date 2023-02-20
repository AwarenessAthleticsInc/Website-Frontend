// const axios = require('axios').default;

export const staffReducers = {
    populateArray(state, action) {
        state.staff = action.payload;
    },
    clearArray(state) {
        state.staff = [];
    }
}
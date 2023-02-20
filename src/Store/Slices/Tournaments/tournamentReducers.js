// const axios = require('axios').default;

export const tournamentReducers = {
    populateArray(state, action) {
        state.tournaments = action.payload;
    },
    clearArray(state) {
        state.tournaments = [];
    }
}
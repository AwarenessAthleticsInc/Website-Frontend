// const axios = require('axios').default;

export const convenerReducers = {
    setTournaments(state, action) {
        state.tournaments = action.payload;
    },
    clearTournaments(state) {
        state.tournaments = [];
    }
}
// const axios = require('axios').default;

export const metricsReducers = {
    setRegistrationGrowth(state, action) {
       state.registrationGrowth = action.payload;
    },
    clearRegistrationGrowth(state) {
        state.registrationGrowth = [];
    },
    setSiteUserGrowth(state, action) {
        state.SiteUserGrowth = action.payload;
    },
    clearSiteUserGrowth(state) {
        state.SiteUserGrowth = [];
    },
    setTeamGrowth(state, action) {
        state.TeamGrowth = action.payload;
    },
    clearTeamGrowth(state) {
        state.TeamGrowth = [];
    },
}
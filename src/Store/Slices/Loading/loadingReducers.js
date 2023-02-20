// const axios = require('axios').default;

export const loadingReducers = {
    setStage(state, action) {
        state.loading = {
            finsished: false,
            percentage: action.payload
        }
    },
    finishLoading(state) {
        state.loading = {
            finsished: true,
            percentage: 100
        } 
    },
}
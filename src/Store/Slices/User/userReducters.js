export const userReducers = {
    setToken(state, action) {
        state.token = action.payload
    },
    clearToken(state) {
        state.token = '';
    },
    setAccount(state, action) {
        state.account.startDate = action.payload.startDate;
        state.account.username = action.payload.username;
        state.account.name.givenName = action.payload.name.givenName;
        state.account.name.middleName = action.payload.name.middleName;
        state.account.name.familyName = action.payload.name.familyName;
        state.account.phone = action.payload.phone;
        state.account.DateOfBirth = action.payload.DateOfBirth;
        state.account.roles = action.payload.roles;
        state.account.profileImage = action.payload.profileImage;
        state.account.active = action.payload.active;
        state.account.team.name = action.payload.team.name;
        state.account.team.status = action.payload.team.status;
    },
    clearAccount(state, action) {
        state.account.startDate = '';
        state.account.username = '';
        state.account.name.givenName = '';
        state.account.name.middleName = '';
        state.account.name.familyName = '';
        state.account.phone = '';
        state.account.DateOfBirth = '';
        state.account.roles = '';
        state.account.profileImage = '';
        state.account.active = '';
        state.account.team.name = '';
        state.account.team.status = '';
    },
    logout(state) {
        state.auth = false;
    },
    login(state) {
        state.auth = true;
    },
    setRegistrations(state, action) {
        state.registrations = action.payload
    },
    clearRegistrations(state) {
        state.registrations = [];
    },
    setOrders(state, action) {
        state.orders = action.payload
    },
    clearOrders(state) {
        state.orders = [];
    },
    setPayments(state, action) {
        state.payments = action.payload
    },
    clearPayments(state) {
        state.payments = [];
    }
}
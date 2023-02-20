/**
 * Imports
 */
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { userSlice, userActions } from "./Slices/User/userSlice";
import { messageSlice } from "./Slices/MessageHandling/messageSlice";
import { useEffect } from "react";
import axios from "axios";
import { tournamentActions, tournamentSlice } from "./Slices/Tournaments/tournamentSlice";
import { productSlice, productActions } from './Slices/Products/productSlice'
import { tocSlice, tocActions } from './Slices/Toc/TocSlice';
import { stockSlice, stockActions } from './Slices/Stock/stockSlice';
import { documentSlice, documentActions } from "./Slices/Documents/documentsSlice";
import { staffActions, staffSlice } from "./Slices/Staff/staffSlice";
import { FaqActions, FaqSlice } from "./Slices/Faq/FaqSlice";
import { cartActions, cartSlice } from './Slices/Cart/cartSlice';
import { convenerSlice, convenerActions } from './Slices/Convener/convenerSlice';
import { registrationActions, registrationSlice } from "./Slices/Registrations/registrationSlice";
import { teamActions, teamSlice } from "./Slices/Teams/teamSlice";
import { orderSlice, orderActions } from './Slices/Orders/orderSlice';
import { allUserActions, allUserSlice } from './Slices/Users/userSlice';
import { paymentActions, paymentSlice } from './Slices/Payments/paymentSlice';
import { metricsActions, metricsSlice } from "./Slices/Metrics/metricsSlice";
import { loadingSlice, loadingActions } from "./Slices/Loading/loadingSlice";
/**
 * Redux Store
 */
const reduxStore = configureStore({
    reducer: {
        messages: messageSlice.reducer,
        user: userSlice.reducer,
        tournaments: tournamentSlice.reducer,
        products: productSlice.reducer,
        toc: tocSlice.reducer,
        stock: stockSlice.reducer,
        documents: documentSlice.reducer,
        staff: staffSlice.reducer,
        faq: FaqSlice.reducer,
        cart: cartSlice.reducer,
        convener: convenerSlice.reducer,
        registrations: registrationSlice.reducer,
        teams: teamSlice.reducer,
        orders: orderSlice.reducer,
        allUsers: allUserSlice.reducer,
        payments: paymentSlice.reducer,
        metrics: metricsSlice.reducer,
        loading: loadingSlice.reducer
    }
});


/**
 * React Startup Component for our redux store
 * this will populate needed data
 */
const ReduxStoreStartup = () => {
    const dispatch = useDispatch();
    /**
     * States
     */
    const user = useSelector(state => state.user.account);
    const token = useSelector(state => state.user.token);
    const userAuth = useSelector(state => state.user.auth);
    /**
     * Authenticated Axios Instance
     */
    const Axios = axios.create({
        headers: { 'Authorization': `Bearer ${token}` }
    });

    /**
     * Start up effect
     */
    useEffect(() => {
        dispatch(loadingActions.setStage(50));
        const getData = async () => {
            //get basic startup data for the app
            axios.get('/api/startup').then((res) => {
                dispatch(tournamentActions.populateArray(res.data.tournaments));
                dispatch(productActions.populateArray(res.data.products));
                dispatch(tocActions.populateArray(res.data.toc));
                dispatch(stockActions.populateArray(res.data.stock));
                dispatch(documentActions.populateArray(res.data.documents));
                dispatch(staffActions.populateArray(res.data.staff));
                dispatch(FaqActions.populateArray(res.data.faq));
                dispatch(cartActions.populateArray(res.data.cart));
            });

            //check if a user is logged in on this session
            axios.get('/api/authenticate').then((res) => {
                dispatch(userActions.setToken(res.data));
            });
        }
        getData();

    });


    /**
     * Additional data effects
     */
    useEffect(() => {
        dispatch(loadingActions.setStage(75));
        //get current users profile data
        if (token.length > 1) {
            Axios.get('/api/user').then((res) => { 
                dispatch(userActions.setAccount(res.data.account));
                if (res.data.registrations !== undefined) {
                    dispatch(userActions.setRegistrations(res.data.registrations));
                }
                if(res.data.orders !== undefined) {
                    dispatch(userActions.setOrders(res.data.orders));
                }
                if(res.data.payments !== undefined) {
                    dispatch(userActions.setPayments(res.data.payments));
                }
                dispatch(userActions.login());
            });
        }

    }, [token, dispatch, Axios]);


    /**
     * Get more data depeneding on user type
     * for admins or conveners
     */
    useEffect(() => {
        if (!userAuth) {
            return;
        }
        if (user.roles === 'Convener') {
            // get Convener data if roles === 'convener'
            Axios.get('/api/convener/data').then((res) => {
                dispatch(convenerActions.setTournaments(res.data.tournaments));
            });
        }
        if (user.roles === 'admin') {
            // get admin data if roles === 'admin'
            const getData = async () => {
                Axios.get('/api/admin/data').then((res) => {
                    dispatch(registrationActions.populateArray(res.data.registrations));
                    dispatch(teamActions.populateArray(res.data.teams));
                    dispatch(orderActions.populateArray(res.data.orders));
                    dispatch(allUserActions.populateArray(res.data.users));
                    dispatch(paymentActions.populateArray(res.data.payments));
                    dispatch(metricsActions.setRegistrationGrowth(res.data.registrationGrowth));
                    dispatch(metricsActions.setSiteUserGrowth(res.data.siteUserGrowth));
                    dispatch(metricsActions.setTeamGrowth(res.data.teamGrowth));
                });
                Axios.get('/api/convener/data').then((res) => {
                    dispatch(convenerActions.setTournaments(res.data.tournaments));
                });
            }
            getData();
        }
    }, [user, Axios, dispatch, userAuth]);
    
    setTimeout(() => {
        dispatch(loadingActions.finishLoading());
    }, 1000);
}
export { ReduxStoreStartup, reduxStore }
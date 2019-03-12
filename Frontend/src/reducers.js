import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT,
    UPDATE_USER_ENTRIES
} from './constants.js';

import { combineReducers } from 'redux';

const initialStateUser = {
    user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
    }
};

const userReducer = (state = initialStateUser, action = {}) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                user: action.payload.user
            };
        case LOGIN_FAILURE:
            return {};
        case LOGOUT:
            return {};
        case UPDATE_USER_ENTRIES:
            return { ...state, user: { ...state.user, entries: action.payload } };
        default:
            return state;
    }
};

const initialStateauthentication = {
    user: {
        loggedIn: false,
        loginError: false
    }
};

const authenticationReducer = (state = initialStateauthentication, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                loggedIn: true,
                loginError: false
            };
        case LOGIN_FAILURE:
            return {
                loggedIn: false,
                loginError: true
            };
        case LOGOUT:
            return initialStateauthentication;
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    userReducer,
    authenticationReducer
});

export default rootReducer;

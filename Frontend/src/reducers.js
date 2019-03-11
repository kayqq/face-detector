import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT,
    UPDATE_USER_ENTRIES
} from './constants.js';

const initialStateUser = {
    user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
    }
};

export const loadUserData = (state = initialStateUser, action = {}) => {
    switch (action.type) {
        case UPDATE_USER_ENTRIES: // WORK ON THIS
            return { ...state, user: { ...state.user, entries: action.payload } };
        default:
            return state;
    }
};

// let user = JSON.parse(localStorage.getItem('user'));
// const initialStateAuthentication = user ? { loggedIn: true, user } : {};

const initialStateauthentication = {
    user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
    }
};

export const authentication = (state = initialStateauthentication, action) => {
    switch (action.type) {
        // case LOGIN_REQUEST:
        //     return {
        //         loggingIn: true,
        //         user: action.user
        //     };
        case LOGIN_SUCCESS:
            return {
                loggedIn: true,
                user: action.payload.user
            };
        case LOGIN_FAILURE:
            return {};
        case LOGOUT:
            return {};
        default:
            return state;
    }
};

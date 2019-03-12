import {
    UPDATE_USER_ENTRIES,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT
} from './constants.js';
import history from './history';
import { authenticateUser, authenticatetoken, logoutUser, updateEntries } from './services';

export const tokenLogin = token => {
    return dispatch => {
        dispatch({
            type: LOGIN_REQUEST
        });
        authenticatetoken(token)
            .then(user => {
                dispatch({ type: LOGIN_SUCCESS, payload: { user } });
            })
            .catch(err => dispatch({ type: LOGIN_FAILURE }));
        history.push('/');
    };
};

export const login = (email, password) => {
    return dispatch => {
        dispatch({
            type: LOGIN_REQUEST
        });
        authenticateUser(email, password)
            .then(user => {
                if (!user.id) {
                    Promise.reject();
                }
                dispatch({ type: LOGIN_SUCCESS, payload: { user } });
                history.push('/');
            })
            .catch(err => {
                dispatch({ type: LOGIN_FAILURE });
            });
    };
};

export const logout = () => {
    return dispatch => {
        logoutUser();
        history.push('/');
        dispatch({
            type: LOGOUT
        });
    };
};

export const incrementEntries = userId => {
    return dispatch => {
        updateEntries(userId)
            .then(userEntries =>
                dispatch({
                    type: UPDATE_USER_ENTRIES,
                    payload: userEntries
                })
            )
            .catch(err => console.log(err));
    };
};

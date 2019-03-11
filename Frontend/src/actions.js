import API_URL from './config/config';
import {
    LOAD_USER,
    UPDATE_USER_ENTRIES,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT
} from './constants.js';
import history from './history';
import { authenticateUser, authenticatetoken, logoutUser } from './services';

export const updateEntries = userEntries => {
    return dispatch =>
        dispatch({
            type: UPDATE_USER_ENTRIES,
            payload: userEntries
        });
};

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
                dispatch({ type: LOGIN_SUCCESS, payload: { user } });
            })
            .catch(err => dispatch({ type: LOGIN_FAILURE }));
        history.push('/');
    };
};

export const logout = () => {
    return dispatch => {
        logoutUser();
        dispatch({
            type: LOGOUT
        });
    };
};

export const incrementEntries = userId => {
    return dispatch => {
        fetch(`${API_URL}/image`, {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: userId
            })
        })
            .then(response => response.json())
            .then(userEntries =>
                dispatch({
                    type: UPDATE_USER_ENTRIES,
                    payload: userEntries
                })
            )
            .catch(err => console.log(err));
    };
};

export const getFaceData = link => {
    return fetch(`${API_URL}/imageurl`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            input: link
        })
    })
        .then(response => response.json())
        .then(faceData => {
            const clarifaiFace = faceData.outputs[0].data.regions;
            const image = document.getElementById('inputimage'); // grab id property 'inputimage' from FaceRecognition <img>
            const width = Number(image.width);
            const height = Number(image.height);

            const arrayOfFaces = clarifaiFace.map(face => {
                const box = face.region_info.bounding_box;
                return {
                    // return object for array
                    leftCol: box.left_col * width,
                    topRow: box.top_row * height,
                    rightCol: width - box.right_col * width,
                    bottomRow: height - box.bottom_row * height
                };
            });
            return arrayOfFaces;
        })
        .catch(err => console.log(err));
};

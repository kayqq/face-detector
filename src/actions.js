import { 
    CHANGE_INPUT,
    CHANGE_FACE_BOXES,
    LOAD_USER,
    UPDATE_USER_ENTRIES,
    CHANGE_IMAGEURL,
    CHANGE_ROUTE,
    USER_SIGNIN,
    USER_SIGNOUT,
} from './constants.js';

export const setInput = (text) => ({
    type: CHANGE_INPUT,
    payload: text
})

export const setImageUrl = (image) => ({
    type: CHANGE_IMAGEURL,
    payload: image
})

export const setFaceBoxes = (faceData) => ({
    type: CHANGE_FACE_BOXES,
    payload: faceData
})

export const loadUser = (user) => ({
    type: LOAD_USER,
    payload: user
})

export const updateEntries = (userEntries) => ({
    type: UPDATE_USER_ENTRIES,
    payload: userEntries
})

export const setRoute = (route) => ({
    type: CHANGE_ROUTE,
    payload: route
})

export const userSignin = () => ({
    type: USER_SIGNIN,
})

export const userSignout = () => ({
    type: USER_SIGNOUT
})



import { 
    CHANGE_INPUT,
    CHANGE_FACE_BOXES,
    LOAD_USER,
    UPDATE_USER_ENTRIES,
    CHANGE_IMAGEURL,
    CHANGE_ROUTE,
    USER_SIGNIN,
} from './constants.js';

const initialStateInput = {
    input: ''
}

export const changeInput = (state = initialStateInput, action = {}) => {
    switch(action.type) {
        case CHANGE_INPUT:
            return Object.assign({}, state, { input: action.payload });
        default: 
            return state;
        }
}

const initialStateImageUrl = {
    imageUrl: ''
}

export const changeImageUrl = (state = initialStateImageUrl, action = {}) => {
    switch(action.type) {
        case CHANGE_IMAGEURL: 
            return Object.assign({}, state, { imageUrl: action.payload });
        default: 
            return state;
    }
}

const initialFaceBoxes = {
    faceBoxes: []
}

export const changeFaceBoxes = (state = initialFaceBoxes, action = {}) => {
    switch(action.type) {
        case CHANGE_FACE_BOXES:
            if (action.payload) {
                const clarifaiFace = action.payload.outputs[0].data.regions;
                const image = document.getElementById('inputimage'); // grab id property 'inputimage' from FaceRecognition <img>
                const width = Number(image.width); 
                const height = Number(image.height);
            
                const arrayOfFaces = clarifaiFace.map((face) => {
                    const box = face.region_info.bounding_box;
                    return { // return object for array
                        leftCol: box.left_col * width,
                        topRow: box.top_row * height,
                        rightCol: width - (box.right_col * width),
                        bottomRow: height - (box.bottom_row * height)
                    }     
                })
                return Object.assign({}, state, { faceBoxes: arrayOfFaces });
            }
            break;
        default:
            return state;
    }
}

const initialStateUser = {
    user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
    }
}

export const loadUserData = (state = initialStateUser, action = {}) => {

    switch(action.type) {
        case LOAD_USER:
            return Object.assign({}, state, { 
                user: { 
                    id: action.payload.id, 
                    name: action.payload.name, 
                    email: action.payload.email, 
                    entries: action.payload.entries, 
                    joined: action.payload.joined 
                }
            });
        case UPDATE_USER_ENTRIES: // WORK ON THIS
            return {...state, user: {...state.user, entries: action.payload } };
        default:
            return state;
    }
}

const initialStateRoute = {
    route: 'home'
}

export const changeRoute = (state = initialStateRoute, action = {}) => {
    switch(action.type) {
        case CHANGE_ROUTE:
            return Object.assign({}, state, { route: action.payload });
        default:
            return state;
    }
}
const initialStateUserStatus = {
    isSignedIn: false
}

export const changeUserStatus = (state = initialStateUserStatus, action = {}) => {
    switch(action.type) {
        case USER_SIGNIN:
            return Object.assign({}, state, { isSignedIn: true });
        default:
            return state;
    }
}
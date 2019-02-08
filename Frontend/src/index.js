import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import './index.css';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import 'tachyons';
import { changeInput, changeFaceBoxes, loadUserData, changeImageUrl, changeRoute, changeUserStatus, } from './reducers';
import { USER_SIGNOUT } from './constants';

const logger = createLogger();

const appReducer = combineReducers({ changeInput, changeFaceBoxes, loadUserData, changeImageUrl, changeRoute, changeUserStatus, })
  
const rootReducer = (state, action) => {
    if (action.type === USER_SIGNOUT) {
        localStorage.removeItem('token');
        state = undefined
    }
    return appReducer(state, action)
}

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware, logger))

ReactDOM.render(
    <Provider store={store}> 
    <App />
    </Provider>, document.getElementById('root'));
registerServiceWorker();

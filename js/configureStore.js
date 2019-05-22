

import {createStore, applyMiddleware, compose} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';

import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import { createFilter, createBlacklistFilter } from 'redux-persist-transform-filter';

import thunk from 'redux-thunk';

import reducer from './reducers';

import {
    createReactNavigationReduxMiddleware,
  } from 'react-navigation-redux-helpers';

//fix redux-devtool bug with redux >4.0
const reduxModule = require('redux');
reduxModule.__DO_NOT_USE__ActionTypes.INIT = '@@redux/INIT';
reduxModule.__DO_NOT_USE__ActionTypes.REPLACE = '@@redux/REPLACE';

//config middlewars
const navigationMiddleware = createReactNavigationReduxMiddleware(
    "root",
    state => state.nav,
  );
const middlewares = [thunk, navigationMiddleware];

//config enhancer
let enhancer = null
if (__DEV__) {
    enhancer = composeWithDevTools(applyMiddleware(...middlewares));
} else {
    enhancer = compose(applyMiddleware(...middlewares));
}

//config persisStore
const loginReducerFilter = createBlacklistFilter(
    'loginReducer',
    ['requesting', 'autologin']
);
const persistConfig = {
    key: 'root',
    storage,
    stateReconciler: autoMergeLevel2,
    whitelist: [
        'loginReducer',
        'app',
    ],
    transforms: [
        loginReducerFilter,
    ],
}
const persistedReducer = persistReducer(persistConfig, reducer)


function configureStore(initialState = {}) {
    const store = createStore(persistedReducer, initialState, enhancer);
    const persistor = persistStore(store)
    // persistor.purge()
    return {store, persistor};;
}

export const {store, persistor} = configureStore()

export default store
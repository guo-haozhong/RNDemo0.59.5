//@flow

import { Record } from 'immutable'

// import { REHYDRATE } from 'redux-persist/constants'

import { handleAction } from 'redux-actions'

import { setAppInfo } from './AppActions'

const initState = {    
    appVersionCode: null,
    appVersionName: null,
}

export default function (state = initState, action) {
    return reducer(state, action)
}

const reducer = handleAction(
    setAppInfo,
    (state, action) => (
        {...state, ...action.payload}
    ),
    {},
);
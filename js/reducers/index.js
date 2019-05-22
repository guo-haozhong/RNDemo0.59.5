import { combineReducers } from 'redux'

import navReducer from './NavReducer'
import appReducer from './AppReducer'
import { resetAppInfo } from './AppActions'


function createNamedWrapperReducer(reducerFunction, reducerName) {
    return (state, action) => {
        const { name } = action;
        const isInitializationCall = state === undefined;
        if (name !== reducerName && !isInitializationCall) return state;

        return reducerFunction(state, action);
    }
}

const noResetReducersConfig = {
    nav: navReducer,
    app: appReducer,
}

const canResetReducersConfig = {

}

const reducers = combineReducers(canResetReducersConfig);

const otherReducers = combineReducers({ ...noResetReducersConfig, ...canResetReducersConfig })

export default (state: any, action: any) => {
    if (action.type === resetAppInfo.toString()) {
        let newState = reducers(undefined, action)
        newState = { ...state, ...newState }
        return otherReducers(newState, action)
    }
    return otherReducers(state, action)
}



import {
    NativeModules
} from 'react-native'

var CommonModule = NativeModules.CommonModule;

//android only
export const exitApp = CommonModule.exitApp


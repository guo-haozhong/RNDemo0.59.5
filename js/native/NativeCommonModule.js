
import {
    NativeModules,
    Platform
} from 'react-native'

var CommonModule = NativeModules.CommonModule;

//android only
export const exitApp = Platform.OS == 'android' && CommonModule.exitApp


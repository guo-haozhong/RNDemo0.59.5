import {
    ToastAndroid,
    Platform,
    Alert,
} from 'react-native'

import { NavigationActions } from "react-navigation";
import toast from 'react-native-root-toast';
const Toast = {
    show: (msg) => {
        toast.show(msg, {
            duration: toast.durations.LONG,
            position: toast.positions.BOTTOM,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0,
            backgroundColor:'#f8f8f8',
            textColor:'black',
            onShow: () => {
                // calls on toast\`s appear animation start
            },
            onShown: () => {
                // calls on toast\`s appear animation end.
            },
            onHide: () => {
                // calls on toast\`s hide animation start.
            },
            onHidden: () => {
                // calls on toast\`s hide animation end.
            }
        })
    }
}

global.Hozan={
    Toast
}
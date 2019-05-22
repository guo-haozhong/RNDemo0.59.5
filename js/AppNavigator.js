import {createStackNavigator} from 'react-navigation'
import NavigationHeader, {
    StatusBarWithLightContent,
    StatusBarWithDarkContent,
    MainTabBarHeader
} from './component/NavigationHeader'

import EDSplashScreen from './pages/splash/EDSplashScreen'
import MainTabNaivigator from './pages/maintab/MainTabNavigator'
const AppNavigator = createStackNavigator({
    mainTab: {
        screen: MainTabNaivigator,
        navigationOptions: ({navigation}) => ({
            header: StatusBarWithDarkContent,
        }),
    },

}, {
    headerMode: 'screen',
    navigationOptions: NavigationHeader,
})
const AppRootStack = createStackNavigator({
    splash: {
        screen: EDSplashScreen,
        navigationOptions: ({navigation}) => ({
            header: null,
        }),
    },
    app:{
        screen: AppNavigator,
        navigationOptions: ({navigation}) => ({
            header: null,
        }),
    }
}, {
    headerMode: 'screen',
    mode: 'modal',
    navigationOptions: NavigationHeader
})
export default AppRootStack
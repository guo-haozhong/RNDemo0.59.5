import {StackNavigator} from 'react-navigation'
import NavigationHeader, {
    StatusBarWithLightContent,
    StatusBarWithDarkContent,
    MainTabBarHeader
} from './component/NavigationHeader'

import EDSplashScreen from './pages/splash/EDSplashScreen'
const AppRootStack = StackNavigator({
    splash: {
        screen: EDSplashScreen,
        navigationOptions: ({navigation}) => ({
            header: null,
        }),
    },
}, {
    headerMode: 'screen',
    mode: 'modal',
    navigationOptions: NavigationHeader
})
export default AppRootStack
//@flow
import React, {Component} from 'react'
import {
    View,
    Image,
    Platform,
    StatusBar,
    TouchableWithoutFeedback
} from 'react-native'
import {
    Header
} from 'react-navigation'
export default (params) => {
    const headerStyle = Platform.OS === 'android' ? {
        backgroundColor: '#fff',
        paddingTop: StatusBar.currentHeight,
        height: StatusBar.currentHeight + 44,
    } : {
        backgroundColor: '#fff',
    }
    return {
        headerBackTitle: null,
        headerStyle: headerStyle,
        headerTitleStyle: {
            textAlign: 'center',
            fontSize: 17,
            fontWeight: Platform.OS === 'ios' ? '600' : '500',
            alignSelf: 'center',
        },
        headerLeft: (
            <TouchableWithoutFeedback onPress={()=>params.navigation.goBack(null)}>
                <View style={{paddingHorizontal: 15}}>
                    <Image
                        source={require('./resources/icon_back_black.png')}
                    />
                </View>
            </TouchableWithoutFeedback>
         ),
        headerRight: (
            <View style={{width: 39}}/>
        ),
        header: (screenProps) => {
            const {getScreenDetails, scene} = screenProps
            const { header } = getScreenDetails(scene)
            if (typeof header !== 'undefined' && typeof header !== 'function') {
                return header;
            }
            return (
                <View>
                    {StatusBarWithDarkContent}
                    <Header {...screenProps}/>
                </View>
            )
        }
    }
}

//白字状态栏
export const StatusBarWithLightContent = (
    <StatusBar
        barStyle={'light-content'}
    />
)

//黑字状态栏
export const StatusBarWithDarkContent = (
    <StatusBar
        barStyle={'dark-content'}
    />
)

export const MainTabBarHeader = (screenProps) => {
    const {scene} = screenProps
    const routeName = scene.route.routes[scene.route.index].routeName
    // if(routeName === 'moneyDetail') {
    //     return StatusBarWithDarkContent
    // }
 
    return StatusBarWithLightContent
}
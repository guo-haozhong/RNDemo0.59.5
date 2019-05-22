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
class MyHeader extends Header {}

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
                    <MyHeader {...screenProps}/>
                </View>
            )
        }
    }
}

export const StatusBarWithLightContent = (
    <StatusBar
        translucent={true}
        backgroundColor={'#00000000'}
        barStyle={'light-content'}
    />
)

export const StatusBarWithDarkContent = (
    <StatusBar
        translucent={true}
        backgroundColor={'#00000000'}
        barStyle={'dark-content'}
    />
)

export const MainTabBarHeader = (screenProps) => {
    const {scene} = screenProps
    const routeName = scene.route.routes[scene.route.index].routeName
    // if(routeName === 'home') {
    //     return StatusBarWithDarkContent
    // }
 
    return StatusBarWithLightContent
}
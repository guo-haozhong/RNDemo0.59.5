/**
 * Created with webstorm
 * User: hfmoney-liuyunxia/liuyunxia8@gmail.com
 * Date: 2017/11/21
 * Time: 上午10:29
 * @flow
 */

import React, { Component } from 'react'
import {
    Image
} from 'react-native'
import { createBottomTabNavigator } from 'react-navigation'
import { BottomTabBar } from 'react-navigation-tabs'
import { StatusBarWithLightContent, StatusBarWithDarkContent } from '../../component/NavigationHeader'
import { activeTintColor, inactiveTintColor } from '../../common/styles'

import HomeScreen from './home/HomeScreen'


export default createBottomTabNavigator({
    home: {
        screen: HomeScreen,
        navigationOptions: ({ navigation }) => ({
            title: '首页',
            header: StatusBarWithDarkContent,
            tabBarIcon: ({ focused }) => (
                <Image
                    style={{ width: 26, height: 26 }}
                    resizeMode={'cover'}
                    source={focused ? require('../../images/tab/tabbar_homepage_selected.png') : require('../../images/tab/tabbar_homepage.png')}
                />
            ),
        }),
    },
    mine: {
        screen: HomeScreen,
        navigationOptions: ({ navigation }) => ({
            title: '我的',
            header: StatusBarWithLightContent,
            tabBarIcon: ({ focused }) => (
                <Image
                    style={{ width: 26, height: 26 }}
                    resizeMode={'cover'}
                    source={focused ? require('../../images/tab/tabbar_mine_selected.png') : require('../../images/tab/tabbar_mine.png')}
                />
            ),
        }),
    },
}, {
        swipeEnabled: false,
        lazy: true,
        animationEnabled: false,
        tabBarOptions: {
            activeTintColor: activeTintColor,
            inactiveTintColor: inactiveTintColor,
            style: {
                backgroundColor: '#fff',
            }
        },
    })
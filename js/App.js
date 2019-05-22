/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  BackHandler,
  TextInput,
  ToastAndroid

} from 'react-native';

//注册路由
import {
  reduxifyNavigator,
} from 'react-navigation-redux-helpers';
import { PersistGate } from 'redux-persist/integration/react'
import AppNavigator from './AppNavigator'
import store, { persistor } from './configureStore'
import { connect, Provider } from 'react-redux'

//引入全局值
require('./common/GlobalValue')

//注入持久化--PersistApp
class PersistApp extends Component {
  lastBackPressed: any
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
  }

  onBackPress = () => {
    //检查键盘
    if (TextInput.State.currentlyFocusedField()) {
      TextInput.State.blurTextInput(TextInput.State.currentlyFocusedField())
      return true
    }

    if (store.getState().nav.index !== 0) {
      store.dispatch(NavigationActions.back());
      return true
    }

    //退出应用
    if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
      //最近2秒内按过back键，可以退出应用。
      return false;
    }

    this.lastBackPressed = Date.now();
    ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT);
    return true;

  }
  render() {
    return (
      <PersistGate loading={null} persistor={persistor}>
        <AppWithNavigationState />
      </PersistGate>
    )
  }
}
//路由
const App = reduxifyNavigator(AppNavigator, "root");
const mapStateToProps = (state) => ({
  state: state.nav,
});
const AppWithNavigationState = connect(mapStateToProps)(App);

//主页面
class Root extends Component {
  constructor() {
    super(...arguments)
  }

  render() {
    return (
      <Provider store={store}>
        <PersistApp />
      </Provider>
    );
  }
}
export default Root
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

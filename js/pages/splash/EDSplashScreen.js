import React, { Component, PureComponent } from 'react';
import {
    StyleSheet,
    View,
    Image,
    Dimensions,
    ActivityIndicator,
    StatusBar
} from 'react-native';
let { width, height } = Dimensions.get("window");

import {
    resetToMainAction,
} from '../../common/NaivgateUtil'

export default class EDSplashScreen extends Component {
    constructor() {
        super(...arguments)
        this.state = {
            animating: true,//默认显示加载动画
        }
    }

    componentDidMount() {
        this.timer=setTimeout(() => {
            this.props.navigation.dispatch(resetToMainAction)
        }, 10);
    }
    componentWillUnmount(){
        this.timer && clearTimeout(this.timer)
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar hidden={true} />
                <Image style={styles.splash} source={require('../../images/splash.png')} resizeMode={'stretch'} />
                <ActivityIndicator
                    animating={this.state.animating}
                    style={[styles.centering, { height: 70 }]}
                    size="small" />
            </View>
        )
    }

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    splash: {
        width: width,
        height: height,
    },
    centering: {
        flex: 1,
        marginTop:-height,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
    },

});
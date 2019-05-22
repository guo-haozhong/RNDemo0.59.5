import React, { Component, PureComponent } from 'react';
import {
    StyleSheet,
    Text,
    Image,
    View,
    TouchableOpacity,
} from 'react-native';

export default class EDSplashScreen extends Component {
    constructor() {
        super(...arguments)
        
    }

    componentDidMount() {

    }

    render() {
        return (
            <View>
                <Text>欢迎！</Text>
            </View>
        )
    }

}
const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
})
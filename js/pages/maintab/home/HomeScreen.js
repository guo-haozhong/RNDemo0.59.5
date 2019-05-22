import React, { Component, PureComponent } from 'react';
import {
    StyleSheet,
    Text,
    Image,
    View,
    TouchableOpacity,
} from 'react-native';

export default class HomeScreen extends Component {
    constructor() {
        super(...arguments)
        this.state = {
            isloading: false
        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <View>
            </View>
        )
    }

}
const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
})
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
            <View style={styles.root}>
                <Text style={{}}>Hello,world!</Text>
            </View>
        )
    }

}
const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent:'center',
        alignItems:"center"
    },
    text:{
        color:"#666",
        fontSize:16
    }
})
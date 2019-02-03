import React, { Component } from 'react';
import {View, TouchableHighlight, Text} from 'react-native';
import styles from './style.js'

export default class Challenge extends Component<Props>{
    onPress = () => {
        
    }
    render(){
        return (
            <View>
                <TouchableHighlight style={styles.button} onPress={this.onPress} underlayColor='#99d9f4'>
                    <Text style={styles.buttonText}>Challenge</Text>
                </TouchableHighlight>
            </View>
        )
    }
}
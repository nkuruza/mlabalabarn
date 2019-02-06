import React, { Component } from 'react';
import { View, TouchableHighlight, Text } from 'react-native';
import styles from './style.js'
import { StorageHelper } from './Storage.js';
import { MlabaApi } from './MlabaApi.js';

export default class Challenge extends Component<Props>{
    componentDidMount() {
        StorageHelper.get("player").then((player) => {
            this.setState({ player: player, opponent: this.props.navigation.state.params.player })
        });

    }
    onPress = () => {
        if (this.state.player.id != this.state.opponent.id)
            MlabaApi.challenge(this.state.player.id, this.state.opponent.id)
        else
            alert('can\'t challenge self')
    }
    render() {
        let opponent = this.props.navigation.state.params.player;
        console.log(this.props.navigation.state.params);
        return (
            <View>
                <Text>Challenge {opponent.name}</Text>
                <TouchableHighlight style={styles.button} onPress={this.onPress} underlayColor='#99d9f4'>
                    <Text style={styles.buttonText}>Challenge</Text>
                </TouchableHighlight>
            </View>
        )
    }
}
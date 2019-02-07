import React, { Component } from 'react';
import { View, TouchableHighlight, Text } from 'react-native';
import styles from '../style.js'
import { StorageHelper } from '../service/Storage.js';
import { MlabaApi } from '../service/MlabaApi';

export default class Challenge extends Component<Props>{
    componentDidMount() {
        StorageHelper.get("player").then((player) => {
            this.setState({ player: player, opponent: this.props.navigation.state.params.player })
        });

    }
    onPress = () => {
        if (this.state.opponent.challenge)
            this.acceptChallenge()
        else
            this.createChallenge();
    }
    createChallenge() {
        if (this.state.player.id != this.state.opponent.id)
            MlabaApi.challenge(this.state.player.id, this.state.opponent.id);
        else
            alert('can\'t challenge self');
    }
    acceptChallenge() {
        //console.log(this.state.opponent);
        MlabaApi.accept(this.state.player.id, this.state.opponent.challenge.id).then(game => {
            console.log(game);
            if (game.id > 0)
                this.props.navigation.navigate("Game", { game: game });
        });
    }
    render() {
        let opponent = this.props.navigation.state.params.player;
        let text = opponent.challenge ? `You were challenged by ${opponent.name}` : `Challenge ${opponent.name}`;
        return (
            <View>
                <Text style={{ fontSize: 20 }}>{text}</Text>
                <TouchableHighlight style={styles.button} onPress={this.onPress} underlayColor='#99d9f4'>
                    <Text style={styles.buttonText}>{opponent.challenge ? "Accept" : "Challenge"}</Text>
                </TouchableHighlight>
            </View>
        )
    }
}
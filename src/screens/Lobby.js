import React, { Component } from 'react';
import { Text, View, TouchableOpacity, FlatList } from 'react-native';
import { MlabaApi } from '../service/MlabaApi';
import { StorageHelper } from '../service/Storage';
import PlayerListItem from '../component/PlayerListItem';

type Props = {};


export default class Lobby extends Component<Props>{
    static navigationOptions = {
        title: 'Lobby'
    };

    _keyExtractor = (item, index) => `palyer-${item.id}`;

    _onPressItem = (player) => {
        this.props.navigation.navigate("Challenge", { player: player });
    };

    constructor(props) {
        super(props);
        this.state = { data: [] }
    }
    componentDidMount() {
        this.refresh();
    }

    refresh(){
        this.joinLobby();
        this.getLobbyPlayers();
        this.checkGame();
        this.checkChallenges();
    }

    joinLobby() {
        StorageHelper.get("player").then((player => {
            this.setState({ player: player });
            MlabaApi.joinLobby(player.id);
        }));
    }
    getLobbyPlayers() {
        MlabaApi.getLobbyPlayers().then(response => {
            this.setState({ data: response })
        });
    }
    checkChallenges() {
        this.challengeTimer = setInterval(() => {
            if (this.state.player) {
                MlabaApi.getChallenges(this.state.player.id).then(challenges => this.updateChallenges(challenges));
            }
            else
                console.log("No player :(");
        }, 1000);
    }
    checkGame(){
        this.gameCheckTimer = setInterval(() => {
            if (this.state.player) {
                //console.log(this.state.player);
                MlabaApi.getPlayerGame(this.state.player.id).then( game => {
                    //console.log(game);
                    if(game.id > 0){
                        clearInterval(this.gameCheckTimer);
                        clearInterval(this.challengeTimer);
                        this.props.navigation.navigate("Game", { game: game, onGoBack: () => this.refresh() });
                    }
                });
            }
            else
                console.log("No player :(");
        }, 5000);
    }
    updateChallenges(challenges) {
        if (challenges && challenges.length > 0) {
            let players = [];
            let challengers = [];

            challenges.forEach(challenge => challengers[challenge.challenger.id] = challenge);
            this.state.data.forEach(player => {
                player.challenge = challengers[player.id];
                players.push(player);
            });
            this.setState({ data: players });
            clearInterval(this.gameCheckTimer);
            clearInterval(this.challengeTimer);
        }
    }
    _itemSeparator = () => (
        <View style={{ borderWidth: 1, borderColor: '#222', width: '86%', marginLeft: '7%' }} />
    );
    _renderItem = ({ item }) => (
        <PlayerListItem
            player={item}
            onPressItem={this._onPressItem}
            title={item.name}
            challenge={item.challenge}
        />
    );
    render() {
        return (
            <FlatList
                ItemSeparatorComponent={this._itemSeparator}
                data={this.state.data}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem} />
        )
    }
}
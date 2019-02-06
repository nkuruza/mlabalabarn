import React, { Component } from 'react';
import { Text, View, TouchableOpacity, FlatList } from 'react-native'
import { MlabaApi } from './MlabaApi';
import { StorageHelper } from './Storage';

type Props = {};
class PlayerListItem extends React.PureComponent {
    _onPress = () => {
        this.props.onPressItem(this.props.player);
    };

    render() {
        const textColor = this.props.selected ? 'red' : 'black';
        return (
            <TouchableOpacity onPress={this._onPress}>
                <View style={{ alignItems: "center" }}>
                    <Text style={{ color: textColor }}>{this.props.title}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

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
        this.joinLobby();
        this.getLobbyPlayers();
        this.checkChallenges();

    }
    joinLobby() {
        StorageHelper.get("player").then((player => {
            this.setState({ player: player });
            MlabaApi.joinLobby(player.id).then(response => console.log(response));
        }));
    }
    getLobbyPlayers() {
        MlabaApi.getLobbyPlayers().then(response => {
            this.setState({ data: response })
        });
    }
    checkChallenges() {
        this.timer = setInterval(() => {
            if (this.state.player) {
                MlabaApi.getChallenges(this.state.player.id).then(challenges => {
                    console.log("challenges");
                    console.log(challenges);
                });
            }
            else
                console.log("No player :(");
        }, 10000);
    }


    _itemSeparator = () => (
        <View style={{ borderWidth: 1, borderColor: '#222', width: '86%', marginLeft: '7%' }} />
    );
    _renderItem = ({ item }) => (
        <PlayerListItem
            player={item}
            onPressItem={this._onPressItem}
            title={item.name}
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
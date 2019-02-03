import React, { Component } from 'react';
import {Text, View, TouchableOpacity, FlatList} from 'react-native'
import { getLobbyPlayers } from './MlabaApi';

type Props = {};
class PlayerListItem extends React.PureComponent {
    _onPress = () => {
        this.props.onPressItem(this.props.id);
    };

    render() {
        const textColor = this.props.selected ? 'red' : 'black';
        return (
            <TouchableOpacity onPress={this._onPress}>
                <View>
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

    _keyExtractor = (item, index) => item.id;

    _onPressItem = (id) => {
        this.props.navigation.navigate("Challenge");
    };

    constructor(props) {
        super(props);
        this.state = { data: [] }
    }
    componentDidMount(){
        getLobbyPlayers().then(response =>{
this.setState({ data: response})
        });
    }
    _renderItem = ({ item }) => (
        <PlayerListItem
            id={item.id}
            onPressItem={this._onPressItem}
            title={item.name}
        />
    );
    render() {
        return (
            <FlatList
                data={this.state.data}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem} />
        )
    }
}
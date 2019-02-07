import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

export default class PlayerListItem extends React.PureComponent {
    _onPress = () => {
        this.props.onPressItem(this.props.player);
    };

    render() {
        const textColor = this.props.challenge ? 'red' : 'black';
        return (
            <TouchableOpacity onPress={this._onPress}>
                <View style={{ alignItems: "center" }}>
                    <Text style={{ color: textColor }}>{this.props.title}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}
import React, {Component} from 'react';
import {List} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

export default class Lobby{
    render(){
        return (
            <List>
                <FlatList 
                    data={this.state.data}
                    renderItem={({item}) => (
                        <ListItem
                            title={item.name} />
                    )}/>
            </List>
        )
    }
}
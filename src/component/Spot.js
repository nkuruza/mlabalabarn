import React, {Component} from 'react';
import {Circle} from 'react-native-svg';
type Props = {};

export default class Spot extends Component<Props>{
    render() {
        return <Circle
                    cx={this.props.x}
                    cy={this.props.y}
                    r={this.props.r}
                    stroke="blue"
                    fill="green"
                />
    }
}
import React, {Component} from 'react';
import t from 'tcomb-form-native';
import {View, StyleSheet } from 'react-native';
import Svg,{Rect, Line, Circle} from 'react-native-svg'
import styles from './style.js'

type Props = {};
const User = t.struct({
    username: t.String
});
var options = {
    label: 'User Details',
    auto: 'placeholders',
    fields:{
        password: {
            secureTextEntry: true
        }
    }
}



const Form = t.form.Form;

export default class GameScreen extends Component<Props>{
    static navigationOptions = {
        title: 'Game',
      };
    constructor(props) {
        super(props);
        this.state = {dimensions: undefined}
    }
    onChange(value) {
        this.setState({value: value});
    }
    onPress = () =>{
        console.log(this.state);
    }
    onLayout = event => {
        if (this.state.dimensions) return // layout was already called
        let {width, height} = event.nativeEvent.layout
        this.setState({dimensions: {width, height}})
      }
    render() {
        if (this.state.dimensions) {
            var { dimensions } = this.state;
            var { width, height } = dimensions;
            var top = 0, left = 0, boardWidth = width * 0.8, boardHeight = height * 0.8;
            var plots = [];
            plots["0,0"] = [left, top];
            plots["1,0"] = [left + boardWidth / 2, top];
            plots["2,0"] = [left + boardWidth, top];
            plots["0,1"] = [left, top + boardHeight / 2];
            plots["1,1"] = [left + boardWidth / 2, top + boardHeight / 2];
            plots["2,1"] = [left + boardWidth, top + boardHeight / 2];
            plots["0,2"] = [left, top + boardHeight];
            plots["1,2"] = [left + boardWidth / 2, top + boardHeight];
            plots["2,2"] = [left + boardWidth, top + boardHeight];
            
            
            
            //console.log(Object.keys(plots))
        }
        return (
            <View style={[StyleSheet.absoluteFill, styles.container]} onLayout={this.onLayout}>
            { 
                this.state.dimensions ?
                <Svg height={height} width={width}>
                    <Rect x={left} y={top} width={boardWidth} height={boardHeight} fill="none" stroke="blue" />
                    <Line
                        x1={ plots["2,0"][0] }
                        y1={ plots["2,0"][1] }
                        x2={ plots["0,2"][0] }
                        y2={ plots["0,2"][1] }
                        stroke="blue"
                    />
                    <Line
                        x1={ plots["0,0"][0] }
                        y1={ plots["0,0"][1] }
                        x2={ plots["2,2"][0] }
                        y2={ plots["2,2"][1] }
                        stroke="blue"
                    />
                    <Line
                        x1={ plots["1,0"][0] }
                        y1={ plots["1,0"][1] }
                        x2={ plots["1,2"][0] }
                        y2={ plots["1,2"][1] }
                        stroke="blue"
                    />
                    <Line
                        x1={ plots["0,1"][0] }
                        y1={ plots["0,1"][1] }
                        x2={ plots["2,1"][0] }
                        y2={ plots["2,1"][1] }
                        stroke="blue"
                    />
                    {
                        Object.keys(plots).map(function(key){
                            return <Circle
                                cx={plots[key][0]}
                                cy={plots[key][1]}
                                r="45"
                                stroke="blue"
                                strokeWidth="2.5"
                                fill="green"
                            />
                        })
                    }
                   
                    </Svg>
                : undefined
            }
            
            </View>
        );
    }
}
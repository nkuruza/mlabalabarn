import React, {Component} from 'react';
import {View, StyleSheet } from 'react-native';
import Svg,{Line, Circle, G, } from 'react-native-svg';
import styles from './style.js';
import { getBoard } from './BoardUtils.js';

type Props = {};

export default class Board extends Component<Props>{
    static navigationOptions = {
        title: 'Game',
        header: null
      };
    constructor(props) {
        super(props);
        this.state = {dimensions: undefined, board: undefined, hand: 3}; 
        this.onPressSpot = this.onPressSpot.bind(this)
    }
    onChange(value) {
        this.setState({value: value});
    }
    move(x, y){
        var {board, selected} = this.state;
        if(this.findLine(board.lines, board.plots[selected.x][selected.y], board.plots[x][y]))
        {
            let occupant = board.plots[selected.x][selected.y].occupant;
            occupant.selected = false;
            board.plots[selected.x][selected.y].occupant = null;
            board.plots[x][y].occupant = occupant
            this.setState({board: board, selected: undefined})
        }
    }
    findLine(lines, plot1, plot2){
        //console.log(lines)
        console.log(plot1.index)
        console.log(plot2.index)
        for(line of lines){
            //console.log(line)
            if((line.plot1.x == plot1.index.x && line.plot1.y == plot1.index.y &&  line.plot2.x == plot2.index.x && line.plot2.y == plot2.index.y) ||
            (line.plot1.x == plot2.index.x && line.plot1.y == plot2.index.y &&  line.plot2.x == plot1.index.x && line.plot2.y == plot1.index.y)){
                return line;
            }
        }
        console.log('line not found')
        console.log(lines)
        return undefined;
    }
    
    onPressSpot(x, y){
        var {board, hand, selected} = this.state;
        if(!selected){
            if(!board.plots[x][y].occupant && hand > 0){
                board.plots[x][y].occupant = {
                    player: 1,
                    selected: false
                }
                hand--;
            }
            this.setState({board: board, hand: hand})
        }
        else
            this.move(x,y);
    }
    onPressPiece(x, y){
        var {board, hand, selected} = this.state;
        if (selected){
            board.plots[selected.x][selected.y].occupant.selected = false;
        }
        board.plots[x][y].occupant.selected = true;
        
        this.setState({board: board, hand: hand, selected:{x,y}})
    }
    onLayout = event => {
        if (this.state.dimensions) return // layout was already called
        let {width, height} = event.nativeEvent.layout
        this.setState({dimensions: {width, height}, board: getBoard({width, height})});
      }
    render() {
        if (this.state.dimensions) {
            var { dimensions,board } = this.state;
            var plots = [].concat.apply([], board.plots);

            var { width, height } = dimensions;
            var plotR = (board.width > board.height ? board.height : board.width) / 50;
            var occupantR = plotR * 3;
            var thiz = this; // HACK
        }
        return (
            <View style={[StyleSheet.absoluteFill, styles.container]} onLayout={this.onLayout}>
            { 
                this.state.dimensions ?
                <Svg height={height} width={width}>
                    {
                        Object.keys(board.lines).map(function(key){
                            return <Line
                                    x1={ board.lines[key].x1 }
                                    y1={ board.lines[key].y1 }
                                    x2={ board.lines[key].x2 }
                                    y2={ board.lines[key].y2 }
                                    stroke="blue"
                                />
                        })
                    }
                    {
                        Object.keys(plots).map(function(key){
                            
                            return <G>
                                        <Circle
                                            cx={plots[key].x}
                                            cy={plots[key].y}
                                            r={plotR}
                                            stroke="blue"
                                            fill="green"
                                            onPress={() => thiz.onPressSpot(plots[key].index.x, plots[key].index.y)}
                                        />
                                        
                                        {
                                            plots[key].occupant ?
                                                    <Circle
                                                    cx={plots[key].x}
                                                    cy={plots[key].y}
                                                    r={occupantR}
                                                    stroke="blue"
                                                    fill="red"
                                                    strokeWidth={plots[key].occupant.selected == true ? 4 : 1}
                                                    onPress={() => thiz.onPressPiece(plots[key].index.x, plots[key].index.y)}
                                                    />
                                                    : undefined
                                        }
                                    </G>
                        })
                    }
                                       </Svg>
                : undefined
            }
            
            </View>
        );
    }
}
import React, {Component} from 'react';
import {View, StyleSheet } from 'react-native';
import Svg,{Line, Circle, G, Text, } from 'react-native-svg';
import styles from '../style.js';
import { getBoard } from '../utils/BoardUtils.js';

const MAXPIECES = 3;
type Props = {};

export default class Board extends Component<Props>{
    static navigationOptions = {
        title: 'Game',
        header: null
      };
    constructor(props) {
        super(props);
        this.state = {dimensions: undefined, board: undefined, hand: MAXPIECES}; 
        this.onPressSpot = this.onPressSpot.bind(this)
    }
    onChange(value) {
        this.setState({value: value});
    }
    move(x, y){
        var {board, selected} = this.state;
        if(this.findLine(board.lines, board.plots[selected.y][selected.x], board.plots[y][x]))
        {
            let occupant = board.plots[selected.y][selected.x].occupant;
            occupant.selected = false;
            board.plots[selected.y][selected.x].occupant = null;
            board.plots[y][x].occupant = occupant
            this.setState({board: board, selected: undefined})
        }

    }
    findLine(lines, plot1, plot2){
        
        for(line of lines){
            //console.log(line)
            if((line.plot1.x == plot1.index.x && line.plot1.y == plot1.index.y &&  line.plot2.x == plot2.index.x && line.plot2.y == plot2.index.y) ||
            (line.plot1.x == plot2.index.x && line.plot1.y == plot2.index.y &&  line.plot2.x == plot1.index.x && line.plot2.y == plot1.index.y)){
                return line;
            }
        }
        return undefined;
    }
    checkForGun(){
        var peices = [];
        var {board, hand} = this.state;
        if(MAXPIECES - hand < 3) return;
        for(i = 0; i < board.plots.length; i++){
            for(j = 0; j < board.plots[i].length; j++){
                if(board.plots[i][j].occupant && board.plots[i][j].occupant.player == 1){
                    peices.push(board.plots[i][j].index);
                }
            }
        }
        if(peices[0].x == peices[1].x && peices[0].x == peices[2].x){
            console.log("Guuuuuun");
        }
        if(peices[0].y == peices[1].y && peices[0].y == peices[2].y){
            console.log("Guuuuuun");
        }
        if(peices[0].y == peices[0].x && peices[1].y == peices[1].x && peices[2].y == peices[2].x){
            console.log("Guuuuuun");
        }
        if(peices[0].y == peices[2].x && peices[1].y == peices[1].x && peices[2].y == peices[0].x){
            console.log("Guuuuuun");
        }
    }
    onPressSpot(x, y){
        var {board, hand, selected} = this.state;
        if(!selected){
            if(!board.plots[y][x].occupant && hand > 0){
                board.plots[y][x].occupant = {
                    player: 1,
                    selected: false
                }
                hand--;
            }
            this.setState({board: board, hand: hand})
        }
        else
            this.move(x,y);
        this.checkForGun();
    }
    onPressPiece(x, y){
        var {board, hand, selected} = this.state;
        if (hand > 0) return;
        if (selected){
            board.plots[selected.y][selected.x].occupant.selected = false;
        }
        board.plots[y][x].occupant.selected = true;
        
        this.setState({board: board, selected:{x,y}})
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
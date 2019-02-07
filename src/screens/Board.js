import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Line, Circle, G, Text, } from 'react-native-svg';
import styles from '../style.js';
import { getBoard } from '../utils/BoardUtils.js';
import { StorageHelper } from '../service/Storage.js';
import { MlabaApi } from '../service/MlabaApi.js';

const MAXPIECES = 3;
type Props = {};

export default class Board extends Component<Props>{
    pieceColor = ['#de4598', '#9845de']
    lastMove = null;

    static navigationOptions = {
        title: 'Game',
        header: null
    };
    constructor(props) {
        super(props);
        this.state = { dimensions: undefined, board: undefined, hand: MAXPIECES };
        this.onPressSpot = this.onPressSpot.bind(this)
    }
    componentDidMount() {

    }
    checkMoves() {
        var { game, board } = this.state;
        this.moveTimer = setInterval(() => {
            MlabaApi.getLastMove(game.id).then(res => {
                //console.log(res);
                //console.log(board);

                if ((game.moves.length == 0 && res.id > 0) || (game.moves.length > 0 && res.id > 0 && game.moves[game.moves.length - 1].id != res.id)) {
                    if (res.srcx == null) {
                        game.moves.push(res);
                        board.plots[res.dsty][res.dstx].occupant = {
                            player: this.player1 ? 1 : 0,
                            selected: false
                        }
                        if(this.checkForGun(this.player1 ? 1 : 0)){
                            alert("You lose, you piece of shit");
                        }
                    }
                    else {
                        this.moveOpponent(res);
                    }
                    this.setState({ game: game, board: board });
                    clearInterval(this.moveTimer);
                }

            })
        }, 1000);
    }
    onChange(value) {
        this.setState({ value: value });
    }
    findLine(lines, plot1, plot2) {

        for (line of lines) {
            //console.log(line)
            if ((line.plot1.x == plot1.index.x && line.plot1.y == plot1.index.y && line.plot2.x == plot2.index.x && line.plot2.y == plot2.index.y) ||
                (line.plot1.x == plot2.index.x && line.plot1.y == plot2.index.y && line.plot2.x == plot1.index.x && line.plot2.y == plot1.index.y)) {
                return line;
            }
        }
        return undefined;
    }
    checkForGun(player) {
        console.log(`cheking gun for player ${player}`);
        var peices = [];
        var { board, hand, game } = this.state;
        //console.log(`${MAXPIECES - hand < 3} - ${hand}`)
        //if (MAXPIECES - hand < 3) return;
        if(game.moves.length < 5) return;
        console.log(board)
        for (i = 0; i < board.plots.length; i++) {
            for (j = 0; j < board.plots[i].length; j++) {
                if (board.plots[i][j].occupant && board.plots[i][j].occupant.player == player) {
                    peices.push(board.plots[i][j].index);
                }
            }
        }
        console.log(peices);
        if (peices[0].x == peices[1].x && peices[0].x == peices[2].x) {
            return true;
        }
        if (peices[0].y == peices[1].y && peices[0].y == peices[2].y) {
            return true;
        }
        if (peices[0].y == peices[0].x && peices[1].y == peices[1].x && peices[2].y == peices[2].x) {
            return true;
        }
        if (peices[0].y == peices[2].x && peices[1].y == peices[1].x && peices[2].y == peices[0].x) {
            return true;
        }
    }
    onPressSpot(x, y) {
        if (!this.isMyTurn())
            return;
        var { board, hand, selected, game, player } = this.state;
        if (!selected) {
            const move = { dstx: x, dsty: y };
            MlabaApi.move(this.state.game.id, move).then(res => {
                if (!board.plots[y][x].occupant && hand > 0) {
                    game.moves.push(res);
                    board.plots[y][x].occupant = {
                        player: this.player1 ? 0 : 1,
                        selected: false
                    }
                    hand--;
                    this.setState({ board: board, hand: hand, game: game });
                    this.checkMoves();
                    if(this.checkForGun(this.player1 ? 0 : 1)){
                        this.setWinner(game.id, player.id);
                    }
                }
            });
        }
        else
            this.move(x, y);

    }
    setWinner(gameId, playerId){
        alert("You win :-)");
        MlabaApi.setWinner(gameId, playerId).then( () =>{
             
        });
    }
    isMyTurn() {
        let moveCount = this.state.game.moves.length;
        return (moveCount % 2 == 0 && this.player1) || (moveCount % 2 == 1 && !this.player1);
    }
    moveOpponent(move) {
        var { board, selected, game } = this.state;

        game.moves.push(move);
        let occupant = board.plots[move.srcy][move.srcx].occupant;
        //occupant.selected = false;
        board.plots[move.srcy][move.srcx].occupant = null;
        board.plots[move.dsty][move.dstx].occupant = occupant;
        this.setState({ board: board, selected: undefined });
        if(this.checkForGun(this.player1 ? 1 : 0)){
            alert("You lose, you piece of shit");
        }

    }
    move(x, y) {
        var { board, selected, game } = this.state;
        if (this.findLine(board.lines, board.plots[selected.y][selected.x], board.plots[y][x])) {
            const move = { srcx: selected.x, srcy: selected.y, dstx: x, dsty: y }
            MlabaApi.move(game.id, move).then(res => {
                if (res.id > 0) {
                    game.moves.push(res);
                    let occupant = board.plots[selected.y][selected.x].occupant;
                    occupant.selected = false;
                    board.plots[selected.y][selected.x].occupant = null;
                    board.plots[y][x].occupant = occupant;
                    this.setState({ board: board, selected: undefined });
                    this.checkMoves();
                    if(this.checkForGun(this.player1 ? 0 : 1)){
                        this.setWinner(game.id, player.id);
                    }
                }
            });
        }
    }
    onPressPiece(x, y) {
        if (!this.isMyTurn())
            return;
        var { board, hand, selected } = this.state;
        if (hand > 0) return;
        if (selected) {
            board.plots[selected.y][selected.x].occupant.selected = false;
        }
        board.plots[y][x].occupant.selected = true;

        this.setState({ board: board, selected: { x, y } })
    }
    onLayout = event => {
        if (this.state.dimensions) return // layout was already called
        let { width, height } = event.nativeEvent.layout
        this.setState({ dimensions: { width, height }, board: getBoard({ width, height }) });

        let game = this.props.navigation.state.params.game;

        StorageHelper.get("player").then((player => {
            this.setState({ player: player, game: game });
            this.player1 = player.id == game.player1.id;
            if (!this.isMyTurn())
                this.checkMoves();
        }));

    }
    render() {
        if (this.state.dimensions) {
            var { dimensions, board } = this.state;
            var plots = [].concat.apply([], board.plots);

            var { width, height } = dimensions;
            var plotR = (board.width > board.height ? board.height : board.width) / 50;
            var occupantR = plotR * 3;
            var thiz = this; // HACK TODO: FIX
        }
        return (
            <View style={[StyleSheet.absoluteFill, styles.container]} onLayout={this.onLayout}>
                {
                    this.state.dimensions ?
                        <Svg height={height} width={width}>
                            {
                                Object.keys(board.lines).map(function (key) {
                                    return <Line
                                        x1={board.lines[key].x1}
                                        y1={board.lines[key].y1}
                                        x2={board.lines[key].x2}
                                        y2={board.lines[key].y2}
                                        stroke="blue"
                                    />
                                })
                            }
                            {
                                Object.keys(plots).map(function (key) {

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
                                                    stroke={"blue"}
                                                    fill={thiz.pieceColor[plots[key].occupant.player]}
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
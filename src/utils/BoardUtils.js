
var getPlots = (top, left, boardWidth, boardHeight) =>{
    var plots = [];
    var count = 0;
    for(i = 0; i < 3; i++){
        plots[i] = [];
        for(j = 0; j < 3; j++){
            
            plots[i][j] = {
                x: left + (j == 1 ? boardWidth / 2 : (j == 2 ? boardWidth : 0)),
                y: top + (i == 1 ? boardHeight / 2 : (i == 2 ? boardHeight : 0)),
                occupant:null,
                index:{x: j, y: i},
                key: `${j}-${i}`
            }
        }
    }
    return plots;
}

var getLineKey = line => {
    return line.plot1.x + "," + line.plot1.y + ":" + line.plot2.x + "," + line.plot2.y;
}

var getLines = plots => {
    var lines = [];
    var linekeys = [];
    for(var i = 0; i < plots.length; i++){
        for(j = 0; j < plots[i].length; j++){
            if((j < plots[i].length - 1)){
                line = {
                    x1: plots[i][j].x,
                    y1: plots[i][j].y,
                    x2: plots[i][j + 1].x,
                    y2: plots[i][j + 1].y,
                    plot1: {x: i, y: j},
                    plot2: {x: i, y: j + 1},
                    key: `${i}${j}-${i}${j + 1}`
                }
                lines.push(line);
                
            };
            if(i < plots.length - 1){
                lines.push({
                    x1: plots[i][j].x,
                    y1: plots[i][j].y,
                    x2: plots[i + 1][j].x,
                    y2: plots[i + 1][j].y,
                    plot1: {x: i, y: j},
                    plot2: {x: i + 1, y: j},
                    key: `${i}${j}-${i + 1}${j}`
                });
            }
            if(i == 0 && j == 0)
                lines.push({
                    x1: plots[i][j].x,
                    y1: plots[i][j].y,
                    x2: plots[i + 1][j + 1].x,
                    y2: plots[i + 1][j + 1].y,
                    plot1: {x: i, y: j},
                    plot2: {x: i + 1, y: j + 1},
                    key: `${i}${j}-${i + 1}${j + 1}`
                });
            if(i == 2 && j == 0)
                lines.push({
                    x1: plots[i][j].x,
                    y1: plots[i][j].y,
                    x2: plots[i - 1][j + 1].x,
                    y2: plots[i - 1][j + 1].y,
                    plot1: {x: i, y: j},
                    plot2: {x: i - 1, y: j + 1},
                    key: `${i}${j}-${i - 1}${j + 1}`
                });
            if(i == 0 && j == 2)
                lines.push({
                    x1: plots[i][j].x,
                    y1: plots[i][j].y,
                    x2: plots[i + 1][j - 1].x,
                    y2: plots[i + 1][j - 1].y,
                    plot1: {x: i, y: j},
                    plot2: {x: i + 1, y: j - 1},
                    key: `${i}${j}-${i + 1}${j - 1}`
                });
            if(i == 2 && j == 2)
                lines.push({
                    x1: plots[i][j].x,
                    y1: plots[i][j].y,
                    x2: plots[i - 1][j - 1].x,
                    y2: plots[i - 1][j - 1].y,
                    plot1: {x: i, y: j},
                    plot2: {x: i - 1, y: j - 1},
                    key: `${i}${j}-${i - 1}${j - 1}`
                });
            
        }
    }
    return lines;
}
export var getBoard = dimensions =>{
    var { width, height } = dimensions;
    var boardWidth = width * 0.8, boardHeight = height * 0.8;
    var top = ((height - boardHeight) / 2) * 0.8;
    var left = ((width - boardWidth) / 2) * 0.8;
    var plots = getPlots(top, left, boardWidth, boardHeight);
    return{
        width: boardWidth,
        height: boardHeight,
        top: top,
        left: left,
        plots: plots,
        lines: getLines(plots)
    };
}
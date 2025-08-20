var board = [];
//KEYCODES
const LEFT = 37;
const RIGHT = 39;
const UP = 38;
const DOWN = 40;
var gameOver = false;

function Tile(){
    this.value = 0;
}

function addRandom(){
    var i, j;
    do{
        var i = Math.floor(Math.random()*4); // row index #
        var j = Math.floor(Math.random()*4);
    }while(board[i][j].value != 0); // Check Tile Value
    if(Math.floor(Math.random() * 10) < 3){
        board[i][j].value = 4;
    } else {
        board[i][j].value = 2;
    }
    var id = i+"_"+j;
    $('#tiles').append($("<p class='tile v"+board[i][j].value+"' id='"+id+"'><strong>"+board[i][j].value+"</strong></p>"))
    $("#"+id).css({
        "margin-left":(.25 + j * 4.5)+"rem",
        "margin-top": (.25 + i * 4.5)+"rem"
    })
}

function redrawTiles(){
    $("#tiles").empty();
    for(var i =0; i < board.length; i++){
        for(var j=0; j<board[i].length; j++){
            board[i][j].merged = false;
            if(board[i][j].value != 0){
                var id = i+"_"+j;
                $('#tiles').append($("<p class='tile v"+board[i][j].value+"' id='"+id+"'><strong>"+board[i][j].value+"</strong></p>"))
                $("#"+id).css({
                    "margin-left":(.25 + j * 4.5)+"rem",
                    "margin-top": (.25 + i * 4.5)+"rem"
                }) 
            }
        }
    }
}

function checkGameOver(){
    for(i = 0; i < board.length; i++){
        for(j = 0; j < board.length; j++){
            if(board[i][j].value == 0){
                return false;
            } else if(j < board.length-1 && board[i][j].value == board[i][j+1].value){
                return false;
            } else if (i < board.length-1 && board[i][j].value == board[i+1][j].value){
                return false;
            }
        }
    }
    return true;
}
function shiftUp(){
    var moved = false;
    var total = 0;
    var numMoved = 0;
    for(var i = 1; i < board.length; i++){
        for(var j=0; j<board[i].length; j++){
            if(board[i][j].value !=0){
                total++;
                var r = i;
                while(r > 0 && board[r-1][j].value == 0){
                    moved = true;
                    board[r-1][j].value = board[r][j].value;
                    board[r][j].value = 0;
                    r--
                }
                if(r > 0 && !board[r-1][j].merged){
                    if(board[r-1][j].value == board[r][j].value){
                        moved = true;
                        board[r-1][j].value *= 2;
                        board[r][j].value = 0;
                        board[r-1][j].merged = true;
                    }
                }
                $("#"+i+"_"+j).animate({"margin-top": .25 + r * 4.5 +"rem"}, 100, function(){
                    // what happens when doen animating
                    numMoved++;
                    if(numMoved == total){
                        endOfTurn(moved);
                    }
                })
            }
        }
    }
}

function shiftDown(){
    var moved = false;
    var total = 0
    var numMoved = 0
    for(var i = board.length -2; i >= 0; i --){
        for(var j=0; j<board[i].length; j++){
            if(board[i][j].value !=0){
                total++;
                var r = i;
                while(r < board.length-1 && board[r+1][j].value == 0){
                    moved = true;
                    board[r+1][j].value = board[r][j].value;
                    board[r][j].value = 0;
                    r++
                }
                if(r < board.length-1 && !board[r+1][j].merged){
                    if(board[r+1][j].value == board[r][j].value){
                        moved = true;
                        board[r+1][j].value *= 2;
                        board[r][j].value = 0;
                        board[r+1][j].merged = true;
                    }
                }
                $("#"+i+"_"+j).animate({"margin-top": .25 + r * 4.5 +"rem"}, 100, function(){
                    // what happens when doen animating
                    numMoved++;
                    if(numMoved == total){
                        endOfTurn(moved);
                    }
                })
            }
        }
    }
}

function shiftLeft(){
    var total = 0;
    var numMoved = 0;
    var moved = false;
    for(var i = 1; i < board.length; i++){
        for(var j = 0; j < board[i].length; j++){
            if(board[j][i].value !=0){
                total++;
                var c = i;
                while(c > 0 && board[j][c-1].value == 0){
                    moved = true;
                    board[j][c-1].value = board[j][c].value;
                    board[j][c].value = 0;
                    c--;
                }
                if(c > 0 && !board[j][c-1].merged){
                    if(board[j][c-1].value == board[j][c].value){
                        moved = true;
                        board[j][c-1].value *= 2;
                        board[j][c].value = 0;
                        board[j][c-1].merged = true;
                    }
                }
                $("#"+j+"_"+i).animate({"margin-left": .25 + c * 4.5 +"rem"}, 100, function(){
                    // what happens when doen animating
                    numMoved++;
                    if(numMoved == total){
                        endOfTurn(moved);
                    }
                });
            }
        }
    }
}

function shiftRight(){
    var moved = false;
    var total = 0;
    var numMoved = 0;
    for(var i = board.length-2; i >= 0; i--){
        for(var j=0; j<board[i].length; j++){
            if (board[j][i].value != 0){
                total++;
                var c = i;
                while(c < board.length-1 && board[j][c+1].value == 0){
                    moved = true;
                    board[j][c+1].value = board[j][c].value;
                    board[j][c].value = 0;
                    c++;
                }
                if(c < board.length-1 && !board[j][c+1].merged){
                    if( board[j][c+1].value == board[j][c].value){
                        moved = true;
                        board[j][c+1].value *=2;
                        board[j][c].value = 0;
                        board[j][c+1].merged = true;
                    }
                }
                $("#"+j+"_"+i).animate({"margin-left":.25+c*4.5+"rem"}, 100,function(){ numMoved++; if(numMoved == total){ endOfTurn(moved); } }); } } } }
                    function endOfTurn(moved){
                    if(moved){
                        redrawTiles();
                        addRandom();
                }
            }
function createGrid(){
    board = []
    for(var i = 0; i < 4; i++){
        var row = []
        for(var j = 0; j < 4; j++){
            row.push(new Tile(i, j))
            $("#grid").append($("<div>", {class: "square"}))
        }
        board.push(row)
    }
}

function init(){
    createGrid()
    for(var i = 0; i < 2; i++){
        addRandom()
    }
}

$(function(){
    init();
    $(this).keydown(function(e){
        switch(e.keyCode){
            case UP:
                // shift up
                shiftUp();
                break;
            case DOWN:
                // shift down
                shiftDown();
                break;
            case LEFT:
                // shift left
                shiftLeft();
                break;
            case RIGHT:
                // shift right
                shiftRight();
                break;
        }
    }
)
}
)
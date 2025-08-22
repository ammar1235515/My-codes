var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");
canvas.width = 610;
canvas.height = 610;

var pts = [];
var paths = [];
var gridSize = 60;

function Point(x,y){
    this.drawX = (x+1) * 10;
    this.drawY = (y+1) * 10;
    this.visited = false
    this.neighbors = [];
    this.paths = [];

    this.draw = function(){
        ctx.beginPath(); //PEN DOWN
        ctx.fillStyle = "red";
        ctx.fillRect(this.drawX-2, this.drawY-2, 4, 4);
        ctx.closePath(); //PEN UP
    };

    this.getUnvisited = function(){
        // get unvisited
    };
}

function Path(p1, p2, color){
    this.p1 = p2;
    this.p2 = p2;
    this.vertical = p1.drawX == p2.drawX;
    this.color = color;
    this.draw = function(){
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 4;
        ctx.beginPath();
        if(this.vertical){
            //Path is vertical
            ctx.moveTo(p1.drawX, Math.min(p1.drawY, p2.drawY) - 2);
        ctx.moveTo(p1.drawX, Math.min(p1.drawY, p2.drawY) + 2);
        }

        ctx.stroke();
        ctx.closePath();
    }
}

function initialize(){
    for(var i = 0; i<gridSize; i++){
        var row = [];
        for(var j = 0; j<gridSize; j++){
            row.push(new Point(i,j));
            row[j].draw() //SO DRAW THE POINT
            //ADD NEIGHBOURS
            if(i > 0){
                pts[i-1][j].neighbors.push(row[j])
                row[j].neighbors.push(pts[i-1[j]])
            }
            if(j > 0){
                row[j-1].neighbors.push(row[j]);
                row[j].neighbors.push(row[j-1]);
            }
        }
        pts.push(row) // add row of points to the list
    }
}

initialize()

var path = new Path(pts)
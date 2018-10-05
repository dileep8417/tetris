cvs = document.getElementById("canvas");
ctx = cvs.getContext("2d");

//variables
const rows = 20;
const cols = 10;
const SQ=width=height=20;
var x=0;
var y=0;
const vacant = "white";

//CREATING SQUARES
function drawSquare(x,y,color){
    ctx.fillStyle= color;
    ctx.strokeStyle= "black";
    ctx.fillRect(x*SQ, y*SQ, width, height);
    ctx.strokeRect(x*SQ, y*SQ, width, height);
}

//CREATING BOARD
var board = [];
for(r=0;r<rows;r++){
    board[r] = [];
    for(c=0;c<cols;c++){
        board[r][c] = vacant;
    }
}


//DRAWING THE BOARD
for(r=0;r<rows;r++){
    for(c=0;c<cols;c++){
        drawSquare(c,r,board[r][c]);
    }
}

//CREATING PIECES
const pieces = [
    //0    1
      [Z,"red"],
      [I,"red"],
      [J,"green"],
      [S,"orange"],
      [L,"blue"],
      [O,"yellow"],
      [T,"pink"]
  ];
  
//RANDOM PIECE GENERATOR
function randomPiece(){
    let r = randomN = Math.floor(Math.random()*pieces.length); // 0->6
    return new Piece(pieces[r][0],pieces[r][1]);
}

var p = randomPiece();

function Piece(shape,color){
    this.shape = shape;
    this.color = color;
    this.shapeForm = 0;
    this.activeShape = this.shape[this.shapeForm];
    this.x = 0;
    this.y = 0;
}



//DRAWING THE PIECES (BOTH DRAW AND UNDRAW FUNCTIONS)
Piece.prototype.fill = function(color){
    for(r=0;r<this.activeShape.length;r++){
        for(c=0;c<this.activeShape.length;c++){
            if(this.activeShape[r][c]){
            drawSquare(this.x+c, this.y+r, color);
        }
    }
    }
}

Piece.prototype.draw= function(){
    this.fill(this.color);
}

Piece.prototype.unDraw = function(){
    this.fill(vacant);
}

//MOVING PIECES

//MOVE DOWN
Piece.prototype.moveDown = function(){
    if(!this.COLLISION(0,1,this.activeShape)){
        this.unDraw();
        this.y++;
        this.draw();
    }else{
        this.lock();
       p= randomPiece();
    }
}
//MOVE RIGHT
Piece.prototype.moveRight = function(){
    if(!this.COLLISION(1,0,this.activeShape)){
        this.unDraw();
        this.x++;
        this.draw();
    }else{
        
    }
}
//MOVE LEFT
Piece.prototype.moveLeft = function(){
    if(!this.COLLISION(-1,0,this.activeShape)){
        this.unDraw();
        this.x--;
        this.draw();
    }
}

//ROTATING THE PIECES
Piece.prototype.rotate = function(){
    let newPattern = this.shape[(this.shapeForm+1) % 4];
    if(!this.COLLISION(0,0,newPattern)){
        this.unDraw();
        this.shapeForm = (this.shapeForm+1) % this.shape.length;
        // since EVERY PIECE HAS 4 FORMS & (0+1)%4=1,(1+1)%4=2,(3+1)%4=0 
        this.activeShape = this.shape[this.shapeForm];
        this.draw();
    }
}

//LOCKING THE PIECES
Piece.prototype.lock = function(){
    for(r=0;r<this.activeShape.length;r++){
        for(c=0;c<this.activeShape.length;c++){
            if(!this.activeShape[r][c]){
                continue;
            }
            
        if(this.y + r < 0){
            alert("GameOver");
            var gameover = true;
            break;
        }
        board[this.y+r][this.x+c] = this.color;
    }
    }
}

//COLLISION 
Piece.prototype.COLLISION = function(x,y,piece){
    for(r=0;r<piece.length;r++){
        for(c=0;c<piece.length;c++){
             if(!piece[r][c]){
                continue;
             }
             let newX = this.x+c+x;
             let newY = this.y+r+y;

             if(newX < 0 || newX >= cols || newY >= rows){
                return true;
             }
             if(newY < 0){
                continue;
             }
            
             if(board[newY][newX] != vacant){
                return true;
             }

        }

    }
    return false;
}


//CONTROLS
document.addEventListener('keydown',CONTROL);
function CONTROL(){
    if(event.keyCode==37){
        p.moveLeft();
    }
    else if(event.keyCode==38){
        p.rotate();
    }
    else if(event.keyCode==39){
        p.moveRight();
    }
    else if(event.keyCode==40){
        p.moveDown();
    }
}
// droping the piece

function drop(){
    var gameover = false;
    p.moveDown();
    if(!gameover){
        setTimeout("requestAnimationFrame(drop)",1000);
    }
}
drop();


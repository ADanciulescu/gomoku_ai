var width = 600;
var height = 600;
var num_squares = 30;
var square_size = width/30;

var zeroes =  [];
var exes = [];
var board = [];

var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

init_board();

var i = 0;
var j = 0;
for(i=0;i<num_squares;i++){
    zeroes[i] = [];
    exes[i] = [];
    board[i] = [];
    for(j = 0; j<num_squares;j++){
        zeroes[i][j] = 0;
        exes[i][j] = 0;
        board[i][j] = "";
    }
}






function draw_columns(){
    var x_val = 0;
    while (x_val <= width) {
        ctx.moveTo(x_val,0);
        ctx.lineTo(x_val,height);
        ctx.stroke();
        x_val = x_val + width/num_squares;
    }
}

function draw_rows(){
    var y_val = 0;
    while (y_val <= height) {
        ctx.moveTo(0, y_val);
        ctx.lineTo(600,y_val);
        ctx.stroke();
        y_val = y_val + height/num_squares;
    }
}

function draw_pieces(){

}

function draw_X(x,y){

    
}
function draw_O(x,y){
    ctx.beginPath();
    ctx.arc((x*square_size)+square_size/2,(y*square_size)+ square_size/2,square_size/2-3,0,2*Math.PI);
    ctx.stroke();
}



function init_board() {
    draw_columns();
    draw_rows();
    draw_O(3,4);
}

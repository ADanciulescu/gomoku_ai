init_board();



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

function init_pieces(){
    var i = 0;
    var j = 0;
    for(i=0;i<num_squares;i++){
        zeroes[i] = [];
        exes[i] = [];
        board[i] = [];
        for(j = 0; j<num_squares;j++){
            zeroes[i][j] = 0;
            exes[i][j] = 0;
            board[i][j] = "_";
        }
    }
}

function draw_pieces(){
    var i = 0;
    var j = 0;
    for(i=0;i<num_squares;i++){
        for(j = 0; j<num_squares;j++){
            if (board[i][j] == "X"){
                draw_X(i,j);
            }
            else if(board[i][j] == "O"){
                draw_O(i,j);
            }
        }
    }
}

function draw_X(y,x){

    // draw \
    ctx.moveTo(x*square_size + (square_size/4), y*square_size + (square_size/4));
    ctx.lineTo(x*square_size + (3*square_size/4), y*square_size + (3*square_size/4));
    ctx.stroke();

    //draw /
    ctx.moveTo(x*square_size + (square_size/4), y*square_size + (3*square_size/4));
    ctx.lineTo(x*square_size + (3*square_size/4), y*square_size + (square_size/4));
    ctx.stroke();
}
function draw_O(y,x){
    ctx.beginPath();
    ctx.arc((x*square_size)+square_size/2,(y*square_size)+ square_size/2,square_size/2-3,0,2*Math.PI);
    ctx.stroke();
}

function handle_click(event){
    //random 7 offset
    var x = Math.floor((event.pageX -10)/square_size);
    var y = Math.floor((event.pageY-10)/square_size);

    if(X_turn){
        board[y][x] = "X";
        exes[y][x] = 1;
        X_turn = false;

    }
    else{
        board[y][x] = "O";
        zeroes[y][x] = 1;
        X_turn = true;
    }
    tick();
}

function init_board() {
    init_pieces();
    draw_columns();
    draw_rows();
    draw_pieces();
    c.addEventListener('click', handle_click, false);
    game_status.textContent = "GAME STARTED";
    //var test_con = new connection('h', ['X', 'X'], 2 , 3);
    //connections.push(test_con);
}

function check_win(){
    var i;
    var j;
    var ans;
    for(i=0;i<num_squares;i++){
        for(j=0;j<num_squares;j++){
            if(board[i][j] == 'X'){
                ans = check_for_pattern(['X','X','X','X','X'],'X',j,i)
            }
            else if(board[i][j] == 'O') {
                ans = check_for_pattern(['O', 'O', 'O', 'O', 'O'], 'O', j, i)
            }
            if(ans){
                return true;
            }
        }
    }

}

function tick(){
    draw_pieces();
    check_board_connections();
    list_connections();
    if (check_win()){
        game_status.textContent = "GAME OVER"
    }
}

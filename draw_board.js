init_board();

function draw_connections(){
  var i;
  ctx.restore();
  ctx.strokeStyle = '#ff0000';
  for(i = 0; i < X_connections.length;i++){
    X_connections[i].draw();
  }
  ctx.strokeStyle = '#0000ff';
  for(i = 0; i < O_connections.length;i++){
    O_connections[i].draw();
  }
  ctx.strokeStyle = '#000000';
}

function draw_columns(){
    var x_val = 0;
    while (x_val <= width) {
      ctx.beginPath();  
      ctx.moveTo(x_val,0);
      ctx.lineTo(x_val,height);
      ctx.stroke();
      x_val = x_val + width/num_squares;
    }
}

function draw_rows(){
    var y_val = 0;
    while (y_val <= height) {
      ctx.beginPath();  
      ctx.moveTo(0, y_val);
      ctx.lineTo(600,y_val);
      ctx.stroke();
      y_val = y_val + height/num_squares;
    }
}


function draw_pieces(){
    var i = 0;
    var j = 0;
    
    ctx.lineWidth=2;
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
    ctx.lineWidth=1;
}

function draw_X(y,x){

    // draw \
    ctx.beginPath();
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
    make_move(y,x);
    tick();
}

function make_move(y,x){  
  
  //update limits
  if (y < up_limit){
    up_limit = y;
  }
  if (y > down_limit){
    down_limit = y;
  }
  if (x < left_limit){
    left_limit = x;
  }
  if (x > right_limit){
    right_limit = x;
  }
  set_actual_limits();

  
  if(X_turn){
    board[y][x] = "X";
    X_turn = false;

  }
  else{
    board[y][x] = "O";
    X_turn = true;
  }
  
  check_square_connections(y, x, board, board_cons, X_connections, O_connections);

}

function init_board() {
    init_pieces();
    draw_columns();
    draw_rows();
    ctx.save();
    // initial X move
    make_move(15,15);
    draw_pieces();
    c.addEventListener('click', handle_click, false);
}

function tick(){
  update_cons_score();
  redraw();
  if (ai_on){
    if(X_turn){
      ai_pick_move();
      make_move(ai_row_pick, ai_col_pick);
    }
    update_cons_score();
    redraw();
  }
}

function update_cons_score(){
  update_X_score();
  update_O_score();
  cur_score_dif = X_score - O_score;  
}

function redraw(){ 
  ctx.clearRect(0, 0, width, height); 
  draw_columns();
  draw_rows();
  draw_pieces();
  draw_connections();
}


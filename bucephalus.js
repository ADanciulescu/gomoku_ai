var hypo_board = [];
var hypo_X_cons = [];
var hypo_O_cons = [];

var best_choice_list = [];
var best_val_diff = -10000;

var actual_left_limit;
var actual_right_limit;
var actual_up_limit;
var actual_down_limit;

function ai_pick_move(){
  set_actual_limits();
  hypo_board = copy_array(board);
  var i;
  var j;
  var c;
  var local_val_diff = 0;
  for(i = actual_up_limit; i <= actual_down_limit; i++){
    for(j = actual_left_limit; j <= actual_right_limit; j++){
      if (hypo_board[i][j] == '_'){
        hypo_board[i][j] = 'X';
        check_board_connections(hypo_board, hypo_X_cons, hypo_O_cons);

        //difference in standing between situation before move and after move
        local_val_diff =  (total_value(hypo_X_cons)- total_value(hypo_O_cons)) - cur_score_dif;
        if (local_val_diff> best_val_diff){
          best_val_diff = local_val_diff;
          c = new choice(i,j,local_val_diff);
          best_choice_list.length = 0;
          best_choice_list.push(c);
        }
        else if(local_val_diff == best_val_diff){
          c = new choice(i,j,local_val_diff);
          best_choice_list.push(c);
        }
        //undo move
        hypo_board[i][j] = '_';
      }
    }
  }
  ai_row_pick = best_choice_list[0].row;
  ai_col_pick = best_choice_list[0].col;

  //reset state
  best_choice_list.length = 0;
  best_val_diff = -10000;
}

function set_actual_limits(){
  if(left_limit-2 >= 0){
    actual_left_limit = left_limit-2;
  }
  else{
    actual_left_limit = 0;
  }

  if(right_limit + 2 < 30){
    actual_right_limit = right_limit + 2;
  }
  else{
    actual_right_limit = 29;
  }

  if(up_limit-2 >= 0){
    actual_up_limit = up_limit-2;
  }
  else{
    actual_up_limit = 0;
  }

  if(down_limit + 2 < 30){
    actual_down_limit = down_limit + 2;
  }
  else{
    actual_down_limit = 29;
  }
}

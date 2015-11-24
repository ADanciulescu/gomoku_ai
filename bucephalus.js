


var actual_left_limit;
var actual_right_limit;
var actual_up_limit;
var actual_down_limit;

function ai_pick_move(){
  var hypo_board = [];
  set_actual_limits();
  hypo_board = copy_array(board);
  var i;
  var j;
  var ai_choice = find_best_move(hypo_board, cur_score_dif, ai_moves, 'X');
  ai_row_pick = ai_choice.row;
  ai_col_pick = ai_choice.col;
}


//INPUTS: Board state, score of board_state before move,  # moves to look ahead, whose turn it is
//OUTPUT: Best Choice
//ASSUMPTIONS: Limits are not readjusted(best move is within existing limits
function find_best_move(hypo_board,prev_score, moves, XorO){
  var best_val_diff = -10000;
  var best_choice_list = [];
  best_choice_list.length = 0;
  var local_val_diff;

  var i;
  var j;

  //###########################################  BASE  CASE  ##################################################
  if (moves == 1){
    for(i = actual_up_limit; i <= actual_down_limit; i++){
      for(j = actual_left_limit; j <= actual_right_limit; j++){
        if (hypo_board[i][j] == '_'){
          hypo_board[i][j] = XorO;
          //difference in standing between situation before move and after move
          if(XorO == 'X'){
            // should be positive since hypo_board should have higher score than prev_score
            local_val_diff = eval_board(hypo_board) - prev_score;
          }
          else{
            //since it is O's turn, hypo_board < prev_scor so again local_val_diff is positivee
            local_val_diff = prev_score - eval_board(hypo_board);
          }
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
  }
  //###########################################  RECURSIVE CASE  ##################################################
  else{
    var best_next_choice;
    var hypo_XorO;
    var hypo_prev_score;
    for(i = actual_up_limit; i <= actual_down_limit; i++){
      for(j = actual_left_limit; j <= actual_right_limit; j++){
        if (hypo_board[i][j] == '_'){
          hypo_board[i][j] = XorO;
          hypo_XorO = (XorO == 'X' ? 'O' : 'X');
          hypo_prev_score = eval_board(hypo_board);
          best_next_choice = find_best_move(hypo_board, hypo_prev_score, moves-1, hypo_XorO);

          //set hypo board best choice calculated recursively
          hypo_board[best_next_choice.row][best_next_choice.col] = (XorO == 'X' ? 'O' : 'X');

          if(XorO == 'X'){
            local_val_diff = eval_board(hypo_board) - prev_score;
          }
          else{
            local_val_diff = prev_score - eval_board(hypo_board);
          }

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
          hypo_board[best_next_choice.row][best_next_choice.col] = '_';
          hypo_board[i][j] = '_';          
        }
      }
    }
  }
  return best_choice_list[0];
}

//return score diff of cur_board from X perspective
function eval_board(hypo_board){
  hypo_X_cons = [];
  hypo_O_cons = [];
  check_board_connections(hypo_board, hypo_X_cons, hypo_O_cons);
  return total_value(hypo_X_cons) - total_value(hypo_O_cons);
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

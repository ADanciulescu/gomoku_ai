function ai_pick_move(){

  set_actual_limits();
  var ai_choice = find_best_move(board,board_cons, X_connections, O_connections, cur_score_dif, ai_moves, 'X');
  ai_row_pick = ai_choice.row;
  ai_col_pick = ai_choice.col;
}


//INPUTS: Board state, score of board_state before move,  # moves to look ahead, whose turn it is
//OUTPUT: Best Choice
//ASSUMPTIONS: Limits are not readjusted(best move is within existing limits
function find_best_move(old_board,old_board_cons, old_X_cons, old_O_cons, prev_score, moves, XorO){
 
  //var hypo_board = jQuery.extend(true, [], old_board);
  //var hypo_board_cons = jQuery.extend(true, [], old_board_cons); 
  //var hypo_X_cons = jQuery.extend(true, [], old_X_cons);
  //var hypo_O_cons = jQuery.extend(true, [], old_O_cons);
  var hypo_board = JSON.parse(JSON.stringify(old_board));  
  var hypo_board_cons = JSON.parse(JSON.stringify(old_board_cons));
  var hypo_X_cons = JSON.parse(JSON.stringify(old_X_cons)); 
  var hypo_O_cons = JSON.parse(JSON.stringify(old_O_cons)); 
  
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
          check_square_connections(i,j, hypo_board, hypo_board_cons, hypo_X_cons, hypo_O_cons);
          //difference in standing between situation before move and after move
          if(XorO == 'X'){
            // should be positive since hypo_board should have higher score than prev_score
            local_val_diff = eval_score(hypo_X_cons, hypo_O_cons) - prev_score;
          }
          else{
            //since it is O's turn, hypo_board < prev_scor so again local_val_diff is positivee
            local_val_diff = prev_score - eval_score(hypo_X_cons, hypo_O_cons);
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
         
           //undo moves
           hypo_board[i][j] = '_';
           //restore(hypo_board_cons, old_board_cons, i, j);
            
           check_square_connections(i,j, hypo_board, hypo_board_cons, hypo_X_cons, hypo_O_cons);
           //hypo_board_cons = JSON.parse(JSON.stringify(old_board_cons));
           //hypo_X_cons = JSON.parse(JSON.stringify(old_X_cons)); 
           //hypo_O_cons = JSON.parse(JSON.stringify(old_O_cons)); 
           //hypo_board_cons = jQuery.extend(true, [], old_board_cons);
           //hypo_X_cons = jQuery.extend(true, [], old_X_cons);
           //hypo_O_cons = jQuery.extend(true, [], old_O_cons);
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
          check_square_connections(i,j, hypo_board, hypo_board_cons, hypo_X_cons, hypo_O_cons);
          
          hypo_XorO = (XorO == 'X' ? 'O' : 'X');
          hypo_prev_score = eval_score(hypo_X_cons, hypo_O_cons);
          best_next_choice = find_best_move(hypo_board, hypo_board_cons, hypo_X_cons, hypo_O_cons,  hypo_prev_score, moves-1, hypo_XorO);

          //set hypo board best choice calculated recursively
          hypo_board[best_next_choice.row][best_next_choice.col] = (XorO == 'X' ? 'O' : 'X');
          check_square_connections(i,j, hypo_board, hypo_board_cons, hypo_X_cons, hypo_O_cons);

          if(XorO == 'X'){
            local_val_diff =  eval_score(hypo_X_cons, hypo_O_cons) - prev_score;
          }
          else{
            local_val_diff = prev_score -  eval_score(hypo_X_cons, hypo_O_cons);
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
           //undo moves
           hypo_board[i][j] = '_';
           check_square_connections(i,j, hypo_board, hypo_board_cons, hypo_X_cons, hypo_O_cons);
           hypo_board[best_next_choice.row][best_next_choice.col] = '_'; 
           check_square_connections(best_next_choice.row,best_next_choice.col, hypo_board, hypo_board_cons, hypo_X_cons, hypo_O_cons);
           //restore(hypo_board_cons, old_board_cons, best_next_choice.row, best_next_choice.col);
           //restore(hypo_board_cons, old_board_cons, i, j);
                       
           //hypo_board_cons = JSON.parse(JSON.stringify(old_board_cons));
           //hypo_X_cons = JSON.parse(JSON.stringify(old_X_cons)); 
           //hypo_O_cons = JSON.parse(JSON.stringify(old_O_cons)); 
           //hypo_X_cons = jQuery.extend(true, [], old_X_cons);
           //hypo_O_cons = jQuery.extend(true, [], old_O_cons);
        }
      }
    }
  }
  return best_choice_list[0];
}

//return score diff of cur_board from X perspective
function eval_score(hypo_X_cons, hypo_O_cons){
  return total_value(hypo_X_cons) - total_value(hypo_O_cons);
}

//restore all board_cons around point row,col
function restore(b_cons, old_b_cons, row, col){
  var i;
  for (i = -4; i < 4; i++){
    //restore v 
    //b_cons[row + i][col] = jQuery.extend(true, [], old_b_cons[row+i][col]);
    b_cons[row+i][col] = JSON.parse(JSON.stringify(old_b_cons[row+i][col]));

    //restore h
    //b_cons[row][col+i] = jQuery.extend(true, [], old_b_cons[row][col+i]);
    b_cons[row][col+i] = JSON.parse(JSON.stringify(old_b_cons[row][col+i]));
    
    //restore /
    //b_cons[row+i][col+i] = jQuery.extend(true, [], old_b_cons[row+i][col+i]);
    b_cons[row-i][col+i] = JSON.parse(JSON.stringify(old_b_cons[row-i][col+i]));
    
    //restore \
    //b_cons[row-i][col+i] = jQuery.extend(true, [], old_b_cons[row-i][col+i]);
    b_cons[row+i][col+i] = JSON.parse(JSON.stringify(old_b_cons[row+i][col+i]));
  }
}

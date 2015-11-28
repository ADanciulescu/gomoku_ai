// take in board state and modify the values of the X and 0 scores and connections
function check_board_connections(board_state, board_cons_state, X_cons, O_cons){
  var i;
  var j;
  var k;
  
  //reset all connections each time we check board
  X_cons.length = 0;
  O_cons.length = 0;

  for (i = (up_limit - 1); i < (down_limit + 1); i++){
    for(j= (left_limit - 1); j < (right_limit + 1); j++){
      if(board_state[i][j] != '_'){
        check_all(board_state, X_cons, O_cons,'X','h', i,j);
        check_all(board_state, X_cons, O_cons,'X','v', i,j);
        check_all(board_state, X_cons, O_cons,'X','/', i,j);
        check_all(board_state, X_cons, O_cons,'X','\\', i,j);
        check_all(board_state, X_cons, O_cons,'O','h', i,j);
        check_all(board_state, X_cons, O_cons,'O','v', i,j);
        check_all(board_state, X_cons, O_cons,'O','/', i,j);
        check_all(board_state, X_cons, O_cons,'O','\\', i,j);
      }
    }
  }
  remove_duplicates(X_cons);
  remove_duplicates(O_cons);
}

// find connections that a particular square (board_state[i][j]) is part of
// invalidate old connections associated with square
// update X_cons, and 0_cons appropriately with new connections
// update it's con_array to point to the cons it is involved in
function check_square_connections(i, j, board_state, con_array, X_cons, O_cons){ 
 
  invalidate_old_cons(X_cons, O_cons, con_array);

  // reset this particular square's connection links
  con_array.length = 0;

  check_all(board_state, X_cons, O_cons,'X','h', i,j,con_array);
  check_all(board_state, X_cons, O_cons,'X','v', i,j,con_array);
  check_all(board_state, X_cons, O_cons,'X','/', i,j,con_array);
  check_all(board_state, X_cons, O_cons,'X','\\', i,j,con_array);
  check_all(board_state, X_cons, O_cons,'O','h', i,j,con_array);
  check_all(board_state, X_cons, O_cons,'O','v', i,j,con_array);
  check_all(board_state, X_cons, O_cons,'O','/', i,j,con_array);
  check_all(board_state, X_cons, O_cons,'O','\\', i,j,con_array);
}

//invalidate all old_connections that square was part of
function invalidate_old_cons(X_cons, O_cons, con_array){
  var i;
  for (i = 0; i< con_array.length; i++){
    if (con_array[i].XorO == 'X'){
      X_cons[con_array[i].index].valid = false;
    }
    else{
      O_cons[con_array[i].index].valid = false;
    }
  }
}



function remove_duplicates(con_list){
  var i = 0;
  var j = 0;

  for(i = 0;i < con_list.length; i++){
    for(j = 0; j< con_list.length; j++){
      if(con_list[i].equals(con_list[j])){
        con_list.splice(j, 1);
        break;
      }     
    }
  }
}

//checks if the symbol at col,row is part of the pattern
function horizontal_check(board_state, X_cons, O_cons, XorO,pattern,row,col,value,con_array){
  var i;
  for (i=0;i<pattern.length; i++){
    // make sure pattern lines up  with the symbol at board[col][row]
    // __X_X_ check both:
    // __X___
    // ____X_
    var array_to_compare;

    if ((pattern[i] == XorO) && ( pattern[i] == board_state[row][col])){
      array_to_compare = cut_array(board_state, X_cons, O_cons, 'h', row, col-i,  pattern.length);
      if(pattern.equals(array_to_compare)){
        con = new connection('h', pattern, row, col-i, value, true);
        if (XorO == 'X'){
          con_array.push(new con_index(X_cons.length, 'X'));
          X_cons.push(con); 
          return true;
        }
        else{
          //negative values signify indices in O_cons
          con_array.push (new con_index(O_cons.length, 'O'));
          O_cons.push(con); 
          return true;       
        }
      }     
    }
  }
  return false;
}

function vertical_check(board_state, X_cons, O_cons, XorO, pattern,row,col, value, con_array){
  var i;
  for (i=0;i<pattern.length; i++){
    var array_to_compare;
    if ((pattern[i] == XorO) && ( pattern[i] == board_state[row][col])){
      array_to_compare = cut_array(board_state, X_cons, O_cons, 'v', row-i, col,  pattern.length);
      if(pattern.equals(array_to_compare)){
        con = new connection('v', pattern, row-i, col, value, true);
        if (XorO  == 'X'){
          con_array.push(new con_index(X_cons.length, 'X'));
          X_cons.push(con); 
          return true;
        }
        else{
          con_array.push (new con_index(O_cons.length, 'O'));
          O_cons.push(con); 
          return true; 
        }
      }     
    }
  }
  return false;
}

// diagonal /
function diagonal_climb_check(board_state, X_cons, O_cons, XorO, pattern,row,col, value,con_array){
  var i;
  for (i=0;i<pattern.length; i++){
    var array_to_compare;
    if ((pattern[i] == XorO) && ( pattern[i] == board_state[row][col])){
      array_to_compare = cut_array(board_state, X_cons, O_cons,'/', row+i, col-i,  pattern.length);
      if(pattern.equals(array_to_compare)){
        con = new connection('/', pattern, row+i, col-i, value, true);
        if (XorO == 'X'){
          con_array.push(new con_index(X_cons.length, 'X'));
          X_cons.push(con); 
          return true;
        }
        else{
          con_array.push (new con_index(O_cons.length, 'O'));
          O_cons.push(con);
          return true;
        }
      }     
    }
  }
  return false;
}

// diagonal \
function diagonal_fall_check(board_state, X_cons, O_cons, XorO, pattern,row,col, value ,con_array){
  var i;
  for (i=0;i<pattern.length; i++){
    var array_to_compare;
    if ((pattern[i] == XorO) && ( pattern[i] == board_state[row][col])){
      array_to_compare = cut_array(board_state, X_cons, O_cons, '\\', row-i, col-i,  pattern.length);
      if(pattern.equals(array_to_compare)){
        con = new connection('\\', pattern, row-i, col-i , value, true);
        if (XorO == 'X'){
          con_array.push(new con_index(X_cons.length, 'X'));
          X_cons.push(con); 
          return true;
        }
        else{
          con_array.push (new con_index(O_cons.length, 'O'));
          O_cons.push(con);
          return true;
        }
      }     
    }
  }
  return false;
}

// cut out a 1 dimensional array from the board
//cut types: h = horizontal, v = vertical, / = diagonal, \ = diagonal
function cut_array (board_state, X_cons, O_cons, type, row, col,  length){
  var cut_array = [length];
  if (type == 'h'){
    for(i = 0;i <length; i++){
      cut_array[i] = board_state[row][col+i];
    }
  }
  else if(type == 'v'){
    for(i = 0;i <length; i++){
      cut_array[i] = board_state[row+i][col];
    }
  }
  else if (type == '/'){
    for(i = 0;i <length; i++){
        cut_array[i] = board_state[row-i][col+i];
      }
  }
  else{
    for(i = 0;i <length; i++){
      cut_array[i] = board_state[row+i][col+i]
    }
  }
  return cut_array;
}

function check_all(board_state, X_cons, O_cons, XorO,type, row,col,con_array){
  var k;
  var result;

  if (XorO == 'X'){
    for (k = 0;k < five_X_patterns.length;k++){ 
      if (check(board_state, X_cons, O_cons, XorO,type,five_X_patterns[k], row, col, val_5,con_array)){
        result = true;
        break;
      }
      result  = false;
    }

    if(!result){
      for (k = 0;k < strong_four_X_patterns.length;k++){ 
        if (check(board_state, X_cons, O_cons, XorO,type,strong_four_X_patterns[k], row, col, val_strong_4,con_array)){
          result = true;
          break;
        }
        result  = false;
      }
    }

    if(!result){
      for (k = 0;k < weak_four_X_patterns.length;k++){ 
        if (check(board_state, X_cons, O_cons, XorO,type,weak_four_X_patterns[k], row, col, val_weak_4,con_array)){
          result = true;
          break;
        }
        result  = false;
      }
    }

    if(!result){
      for (k = 0;k < strong_three_X_patterns.length;k++){ 
        if (check(board_state, X_cons, O_cons, XorO,type,strong_three_X_patterns[k], row, col, val_strong_3,con_array)){
          result = true;
          break;
        }
        result  = false;
      }
    }

    if(!result){
      for (k = 0;k < weak_three_X_patterns.length;k++){ 
        if (check(board_state, X_cons, O_cons, XorO,type,weak_three_X_patterns[k], row, col, val_weak_3,con_array)){
          result = true;
          break;
        }
        result  = false;
      }
    }

    if(!result){
      for (k = 0;k < two_X_patterns.length;k++){ 
        if (check(board_state, X_cons, O_cons, XorO,type, two_X_patterns[k], row, col, val_2,con_array)){
          result = true;
          break;
        }
        result  = false;
      }
    }
  }
  else
  {
    for (k = 0;k < five_O_patterns.length;k++){ 
      if (check(board_state, X_cons, O_cons, XorO,type,five_X_patterns[k], row, col, val_5,con_array)){
        result = true;
        break;
      }
      result  = false;
    }

    if(!result){
      for (k = 0;k < strong_four_O_patterns.length;k++){ 
        if (check(board_state, X_cons, O_cons,XorO,type,strong_four_O_patterns[k], row, col, val_strong_4,con_array)){
          result = true;
          break;
        }
        result  = false;
      }
    }

    if(!result){
      for (k = 0;k < weak_four_O_patterns.length;k++){ 
        if (check(board_state, X_cons, O_cons, XorO,type,weak_four_O_patterns[k], row, col, val_weak_4,con_array)){
          result = true;
          break;
        }
        result  = false;
      }
    }

    if(!result){
      for (k = 0;k < strong_three_O_patterns.length;k++){ 
        if (check(board_state, X_cons, O_cons, XorO,type,strong_three_O_patterns[k], row, col, val_strong_3,con_array)){
          result = true;
          break;
        }
        result  = false;
      }
    }

    if(!result){
      for (k = 0;k < weak_three_O_patterns.length;k++){ 
        if (check(board_state, X_cons, O_cons, XorO,type,weak_three_O_patterns[k], row, col, val_weak_3,con_array)){
          result = true;
          break;
        }
        result  = false;
      }
    }

    if(!result){
      for (k = 0;k < two_O_patterns.length;k++){ 
        if (check(board_state, X_cons, O_cons,XorO,type, two_O_patterns[k], row, col, val_2,con_array)){
          result = true;
          break;
        }
        result  = false;
      }
    }
   
  } 
}

function check(board_state, X_cons, O_cons, XorO,type, pattern, row, col, value,con_array){
  if(type == 'h'){
    return horizontal_check(board_state, X_cons, O_cons, XorO, pattern, row, col, value,con_array);
  }
  else if (type == 'v'){
    return vertical_check(board_state, X_cons, O_cons, XorO, pattern, row, col, value,con_array);
  } 
  else if (type == '/'){
    return diagonal_climb_check(board_state, X_cons, O_cons, XorO, pattern, row, col, value,con_array);
  }
  else{
    return diagonal_fall_check(board_state, X_cons, O_cons, XorO,pattern, row, col, value,con_array);
  }
}

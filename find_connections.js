// take in board state and modify the values of the X and 0 scores and connections
function check_board_connections(board_state, X_cons, O_cons){
  var i;
  var j;
  var k;
  
  //reset all connections each time we check board
  X_cons.length = 0;
  O_cons.length = 0;

  for (i = 0; i < num_squares; i++){
    for(j=0; j < num_squares; j++){
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
  remove_duplicates(X_cons);
  remove_duplicates(O_cons);
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

function find_first_occurance(arr, XorO){
    var i;
    for(i=0; i<arr.length; i++){
        if (arr[i] == XorO) {
            return i;
        }
    }
}

function find_last_occurance(arr, XorO){
    var i;
    for(i=arr.length-1; i>=0; i--){
        if (arr[i] == XorO) {
            return i;
        }
    }
}

//checks if the symbol at col,row is part of the pattern
function horizontal_check(board_state, X_cons, O_cons, XorO,pattern,row,col,value){
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
        con = new connection('h', pattern, row, col-i, value);
        if (XorO == 'X'){
          X_cons.push(con); 
          return true;
        }
        else{
          O_cons.push(con); 
          return true;       
        }
      }     
    }
  }
  return false;
}

function vertical_check(board_state, X_cons, O_cons, XorO, pattern,row,col, value){
  var i;
  for (i=0;i<pattern.length; i++){
    var array_to_compare;
    if ((pattern[i] == XorO) && ( pattern[i] == board_state[row][col])){
      array_to_compare = cut_array(board_state, X_cons, O_cons, 'v', row-i, col,  pattern.length);
      if(pattern.equals(array_to_compare)){
        con = new connection('v', pattern, row-i, col, value);
        if (XorO  == 'X'){
          X_cons.push(con); 
          return true;
        }
        else{
          O_cons.push(con); 
          return true; 
        }
      }     
    }
  }
  return false;
}

// diagonal /
function diagonal_climb_check(board_state, X_cons, O_cons, XorO, pattern,row,col, value){
  var i;
  for (i=0;i<pattern.length; i++){
    var array_to_compare;
    if ((pattern[i] == XorO) && ( pattern[i] == board_state[row][col])){
      array_to_compare = cut_array(board_state, X_cons, O_cons,'/', row+i, col-i,  pattern.length);
      if(pattern.equals(array_to_compare)){
        con = new connection('/', pattern, row+i, col-i, value);
        if (XorO == 'X'){
          X_cons.push(con); 
          return true;
        }
        else{
          O_cons.push(con);
          return true;
        }
      }     
    }
  }
  return false;
}

// diagonal \
function diagonal_fall_check(board_state, X_cons, O_cons, XorO, pattern,row,col, value){
  var i;
  for (i=0;i<pattern.length; i++){
    var array_to_compare;
    if ((pattern[i] == XorO) && ( pattern[i] == board_state[row][col])){
      array_to_compare = cut_array(board_state, X_cons, O_cons, '\\', row-i, col-i,  pattern.length);
      if(pattern.equals(array_to_compare)){
        con = new connection('\\', pattern, row-i, col-i , value);
        if (XorO == 'X'){
          X_cons.push(con); 
          return true;
        }
        else{
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

function check_all(board_state, X_cons, O_cons, XorO,type, row,col){
  var k;
  var result;

  if (XorO == 'X'){
    for (k = 0;k < five_X_patterns.length;k++){ 
      if (check(board_state, X_cons, O_cons, XorO,type,five_X_patterns[k], row, col, val_5)){
        result = true;
        break;
      }
      result  = false;
    }

    if(!result){
      for (k = 0;k < strong_four_X_patterns.length;k++){ 
        if (check(board_state, X_cons, O_cons, XorO,type,strong_four_X_patterns[k], row, col, val_strong_4)){
          result = true;
          break;
        }
        result  = false;
      }
    }

    if(!result){
      for (k = 0;k < weak_four_X_patterns.length;k++){ 
        if (check(board_state, X_cons, O_cons, XorO,type,weak_four_X_patterns[k], row, col, val_weak_4)){
          result = true;
          break;
        }
        result  = false;
      }
    }

    if(!result){
      for (k = 0;k < strong_three_X_patterns.length;k++){ 
        if (check(board_state, X_cons, O_cons, XorO,type,strong_three_X_patterns[k], row, col, val_strong_3)){
          result = true;
          break;
        }
        result  = false;
      }
    }

    if(!result){
      for (k = 0;k < weak_three_X_patterns.length;k++){ 
        if (check(board_state, X_cons, O_cons, XorO,type,weak_three_X_patterns[k], row, col, val_weak_3)){
          result = true;
          break;
        }
        result  = false;
      }
    }

    if(!result){
      for (k = 0;k < two_X_patterns.length;k++){ 
        if (check(board_state, X_cons, O_cons, XorO,type, two_X_patterns[k], row, col, val_2)){
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
      if (check(board_state, X_cons, O_cons, XorO,type,five_X_patterns[k], row, col, val_5)){
        result = true;
        break;
      }
      result  = false;
    }

    if(!result){
      for (k = 0;k < strong_four_O_patterns.length;k++){ 
        if (check(board_state, X_cons, O_cons,XorO,type,strong_four_O_patterns[k], row, col, val_strong_4)){
          result = true;
          break;
        }
        result  = false;
      }
    }

    if(!result){
      for (k = 0;k < weak_four_O_patterns.length;k++){ 
        if (check(board_state, X_cons, O_cons, XorO,type,weak_four_O_patterns[k], row, col, val_weak_4)){
          result = true;
          break;
        }
        result  = false;
      }
    }

    if(!result){
      for (k = 0;k < strong_three_O_patterns.length;k++){ 
        if (check(board_state, X_cons, O_cons, XorO,type,strong_three_O_patterns[k], row, col, val_strong_3)){
          result = true;
          break;
        }
        result  = false;
      }
    }

    if(!result){
      for (k = 0;k < weak_three_O_patterns.length;k++){ 
        if (check(board_state, X_cons, O_cons, XorO,type,weak_three_O_patterns[k], row, col, val_weak_3)){
          result = true;
          break;
        }
        result  = false;
      }
    }

    if(!result){
      for (k = 0;k < two_O_patterns.length;k++){ 
        if (check(board_state, X_cons, O_cons,XorO,type, two_O_patterns[k], row, col, val_2)){
          result = true;
          break;
        }
        result  = false;
      }
    }
   
  } 
}

function check(board_state, X_cons, O_cons, XorO,type, pattern, row, col, value){
  if(type == 'h'){
    return horizontal_check(board_state, X_cons, O_cons, XorO, pattern, row, col, value);
  }
  else if (type == 'v'){
    return vertical_check(board_state, X_cons, O_cons, XorO, pattern, row, col, value);
  } 
  else if (type == '/'){
    return diagonal_climb_check(board_state, X_cons, O_cons, XorO, pattern, row, col, value);
  }
  else{
    return diagonal_fall_check(board_state, X_cons, O_cons, XorO,pattern, row, col, value);
  }
}

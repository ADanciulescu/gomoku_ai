//var three_X_patterns = 
function check_board_connections(){
  var i;
  var j;
  var k;
  
  //reset all connections each time we check board
  X_connections = [];
  for (i = 0; i < num_squares; i++){
    for(j=0; j < num_squares; j++){
      check_all('X','h', i,j);
      check_all('X','v', i,j);
      check_all('X','/', i,j);
      check_all('X','\\', i,j);
    }
  }
  remove_duplicates();
  draw_connections();
}

function remove_duplicates(){
  var i = 0;
  var j = 0;

  for(i = 0;i < X_connections.length; i++){
    for(j = 0; j< X_connections.length; j++){
      if(X_connections[i].equals(X_connections[j])){
        X_connections.splice(j, 1);
      }     
    }
  }
}


function check_for_pattern(pattern, XorO, row, col){
    var start = find_first_occurance(pattern,XorO);
    var end = find_last_occurance(pattern,XorO);
    var box_size = pattern.length + (end-start);



    if (horizontal_check(pattern,box_size,col,row)){
        return true;
    }

    //vertical check
    box_index = 0;
    box_offset =  Math.max(row - ((box_size-1)/2), 0);
    data = [];
    while (box_index < box_size-pattern.length){
        var i = 0;
        for(i = 0; i<pattern.length; i++){
            data[i] =  board[col][box_offset+box_index+i] ;
        }
        if(data.equals(pattern)){
            return true
        }
        box_index++;
    }

    //     \ check
    box_index = 0;
    row_offset =  Math.max(row - ((box_size-1)/2), 0);
    col_offset = Math.max(col - ((box_size-1)/2), 0);
    data = [];
    while (box_index < box_size-pattern.length){
         i = 0;
        for(i = 0; i<pattern.length; i++){
            data[i] =  board[col_offset + box_index + i][row_offset+box_index+i] ;
        }
        if(data.equals(pattern)){
            return true
        }
        box_index++;
    }

    //     / check
    var box_col_index = 0;
    var box_row_index = box_size - 1;
    row_offset =  Math.min(row + ((box_size-1)/2), num_squares);
    col_offset = Math.max(col - ((box_size-1)/2), 0);
    data = [];
    while (box_col_index < box_size-pattern.length){
        i = 0;
        for(i = 0; i<pattern.length; i++){
            data[i] =  board[col_offset + box_col_index + i][row_offset+box_row_index + i] ;
        }
        if(data.equals(pattern)){
            return true
        }
        box_col_index++;
        box_row_index--;
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
function horizontal_check(XorO,pattern,row,col){
  var i;
  for (i=0;i<pattern.length; i++){
    // make sure pattern lines up  with the symbol at board[col][row]
    // __X_X_ check both:
    // __X___
    // ____X_
    var array_to_compare;

    if ((pattern[i] == XorO) && ( pattern[i] == board[row][col])){
      array_to_compare = cut_array('h', row, col-i,  pattern.length);
      if(pattern.equals(array_to_compare)){
        con = new connection('h', pattern, row, col-i);
        if (XorO == 'X'){
          X_connections.push(con); 
          return true;
        }
        else{
        }
      }     
    }
  }
  return false;
}

function vertical_check(XorO, pattern,row,col){
  var i;
  for (i=0;i<pattern.length; i++){
    var array_to_compare;
    if ((pattern[i] == XorO) && ( pattern[i] == board[row][col])){
      array_to_compare = cut_array('v', row-i, col,  pattern.length);
      if(pattern.equals(array_to_compare)){
        con = new connection('v', pattern, row-i, col);
        if (XorO  == 'X'){
          X_connections.push(con); 
          return true;
        }
        else{
        }
      }     
    }
  }
  return false;
}

// diagonal /
function diagonal_climb_check(XorO, pattern,row,col){
  var i;
  for (i=0;i<pattern.length; i++){
    var array_to_compare;
    if ((pattern[i] == XorO) && ( pattern[i] == board[row][col])){
      array_to_compare = cut_array('/', row+i, col-i,  pattern.length);
      if(pattern.equals(array_to_compare)){
        con = new connection('/', pattern, row+i, col-i);
        if (XorO == 'X'){
          X_connections.push(con); 
          return true;
        }
        else{
        }
      }     
    }
  }
  return false;
}

// diagonal \
function diagonal_fall_check(XorO, pattern,row,col){
  var i;
  for (i=0;i<pattern.length; i++){
    var array_to_compare;
    if ((pattern[i] == XorO) && ( pattern[i] == board[row][col])){
      array_to_compare = cut_array('\\', row-i, col-i,  pattern.length);
      if(pattern.equals(array_to_compare)){
        con = new connection('\\', pattern, row-i, col-i);
        if (XorO == 'X'){
          X_connections.push(con); 
          return true;
        }
        else{
        }
      }     
    }
  }
  return false;
}

// cut out a 1 dimensional array from the board
//cut types: h = horizontal, v = vertical, / = diagonal, \ = diagonal
function cut_array (type, row, col,  length){
  var cut_array = [length];
  if (type == 'h'){
    for(i = 0;i <length; i++){
      cut_array[i] = board[row][col+i];
    }
  }
  else if(type == 'v'){
    for(i = 0;i <length; i++){
      cut_array[i] = board[row+i][col];
    }
  }
  else if (type == '/'){
    for(i = 0;i <length; i++){
        cut_array[i] = board[row-i][col+i];
      }
  }
  else{
    for(i = 0;i <length; i++){
      cut_array[i] = board[row+i][col+i]
    }
  }
  return cut_array;
}

function check_all(XorO,type, row,col){
  var k;
  var result;

  for (k = 0;k < five_X_patterns.length;k++){ 
    if (check(XorO,type,five_X_patterns[k], row, col)){
      result = true;
      break;
    }
    result  = false;
  }
  
  if(!result){
    for (k = 0;k < strong_four_X_patterns.length;k++){ 
      if (check(XorO,type,strong_four_X_patterns[k], row, col)){
        result = true;
        break;
      }
      result  = false;
    }
  }

  if(!result){
    for (k = 0;k < weak_four_X_patterns.length;k++){ 
      if (check(XorO,type,weak_four_X_patterns[k], row, col)){
        result = true;
        break;
      }
      result  = false;
    }
  }
  
  if(!result){
    for (k = 0;k < strong_three_X_patterns.length;k++){ 
      if (check(XorO,type,strong_three_X_patterns[k], row, col)){
        result = true;
        break;
      }
      result  = false;
    }
  }
  
  if(!result){
    for (k = 0;k < weak_three_X_patterns.length;k++){ 
      if (check(XorO,type,weak_three_X_patterns[k], row, col)){
        result = true;
        break;
      }
      result  = false;
    }
  }

  if(!result){
    for (k = 0;k < two_X_patterns.length;k++){ 
      if (check(XorO,type, two_X_patterns[k], row, col)){
        result = true;
        break;
      }
      result  = false;
    }
  } 
}

function check(XorO,type, pattern, row, col){
  if(type == 'h'){
    return horizontal_check(XorO, pattern, row, col);
  }
  else if (type == 'v'){
    return vertical_check(XorO, pattern, row, col);
  } 
  else if (type == '/'){
    return diagonal_climb_check(XorO, pattern, row, col);
  }
  else{
    return diagonal_fall_check(XorO,pattern,row,col);
  }
}

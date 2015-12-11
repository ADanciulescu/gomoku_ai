var width = 600;
var height = 600;
var num_squares = 30;
var square_size = width/num_squares;

var zeroes =  [];
var exes = [];
var board = new Array();
var board_cons = new Array();

var c = document.getElementById("myCanvas");
var game_status = document.getElementById("game_status");
var ctx = c.getContext("2d");

var X_turn = true;


var print_connections = document.getElementById("print_connections");
var print_connection_string = "";

var p_X_score = document.getElementById("X_score");
var p_O_score = document.getElementById("O_score");

var X_score;
var O_score;
var cur_score_dif = 0;
var X_connections = new Array();
var O_connections = new Array();

var ai_row_pick;
var ai_col_pick;
var ai_moves = 4;
var ai_on = true;

//limit for rectangle of moves that ai considers
var left_limit = num_squares;
var right_limit = 0;
var up_limit = num_squares;
var down_limit = 0;

var actual_left_limit;
var actual_right_limit;
var actual_up_limit;
var actual_down_limit;

function init_pieces(){
    var i = 0;
    var j = 0;
    for(i=0;i<num_squares;i++){
        zeroes[i] = [];
        exes[i] = [];
        board[i] = [];
        board_cons[i] = [];
        for(j = 0; j<num_squares;j++){
            zeroes[i][j] = 0;
            exes[i][j] = 0;
            board[i][j] = "_";
            board_cons[i][j] = [];
        }
    }
}

Array.prototype.equals = function (array, strict) {
  if (!array)
    return false;

  if (arguments.length == 1)
    strict = true;

  if (this.length != array.length)
    return false;

  for (var i = 0; i < this.length; i++) {
    if (this[i] instanceof Array && array[i] instanceof Array) {
      if (!this[i].equals(array[i], strict))
        return false;
    }
    else if (strict && this[i] != array[i]) {
      return false;
    }
    else if (!strict) {
      return this.sort().equals(array.sort(), true);
    }
  }
  return true;
}

function print_array(a){
  var i;
  for (i = 0; i< a.length; i++){
    window.alert(a);
  }
  window.alert("\n");
}

function copy_array(old){
  a = [];
  var i = 0;
  var j = 0;
  for(i=0;i<num_squares;i++){
    a[i] = [];
    for(j = 0; j<num_squares;j++){
      a[i][j] = old[i][j];
    }
  }
  return a;
}

function copy_board_cons(old){
  var a = [];
  var i;
  var j;
  var k;

  for (i=0;i<num_squares;i++){
    a[i] = []; 
    for(j = 0; j<num_squares;j++){
      a[i][j] = [];
      for (k=0;k<old[i][j].length; k++){
        var c = new index_con(old[i][j][k].index, old[i][j][k].XorO);
        a[i][j].push(c);
      }
    }
  }
  return a;
}

function total_value(list){
  var total = 0;
  var i;

  for(i = 0;i<list.length;i++){
    if (list[i].valid == true){
      total += list[i].value;
    }
  }
  return total;
}

function update_X_score(){
  X_score = total_value(X_connections);
  p_X_score.textContent = "X Score:" + X_score.toString();

}

function update_O_score(){
  O_score = total_value(O_connections);
  p_O_score.textContent = "O Score:" + O_score.toString();
}

var five_X_patterns = [['X','X','X','X','X']];
var strong_four_X_patterns = [['_','X','X','X','X','_']];
var weak_four_X_patterns = [['O','X','X','X','X','_'],['_','X','X','X','X','O'],['X','X','_', 'X', 'X'],['X','_','X', 'X', 'X'], ['X','X','X','_','X']];
var strong_three_X_patterns = [['_','X','X','X','_']];
var medium_three_X_patterns = [['_','X','X','_','X','_'],['_','X','_', 'X', 'X', '_']];
var weak_three_X_patterns = [['O','X','X','X','_'],['_','X','X','X','O'],['_','X','X','_','X','O'],['O','X','X','_','X','_'],['_','X','_','X','X','O'],['O','X','_','X','X','_']];
var two_X_patterns = [['_','X','X','_'], ['_','X','_','X','_']];

var five_O_patterns = [['O','O','O','O','O']];
var strong_four_O_patterns = [['_','O','O','O','O','_']];
var weak_four_O_patterns = [['X','O','O','O','O','_'],['_','O','O','O','O','X'],['O','O','_', 'O', 'O'],['O','_','O', 'O', 'O'], ['O','O','O','_','O']];
var strong_three_O_patterns = [['_','O','O','O','_']];
var medium_three_O_patterns = [['_','O','O','_','O','_'],['_','O','_', 'O', 'O', '_']];
var weak_three_O_patterns = [['X','O','O','O','_'],['_','O','O','O','X'],['_','O','O','_','O','X'],['X','O','O','_','O','_'],['_','O','_','O','O','X'],['X','O','_','O','O','_']];
var two_O_patterns = [['_','O','O','_'], ['_','O','_','O','_']];



var val_5 = 1000000;
var val_strong_4 = 1000;
var val_weak_4 = 8;
var val_strong_3 = 8;
var val_medium_3 = 6;
var val_weak_3  = 4;
var val_2 = 2;


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

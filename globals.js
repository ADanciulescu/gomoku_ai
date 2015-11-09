var width = 600;
var height = 600;
var num_squares = 30;
var square_size = width/num_squares;

var zeroes =  [];
var exes = [];
var board = [];

var c = document.getElementById("myCanvas");
var game_status = document.getElementById("game_status");
var ctx = c.getContext("2d");

var X_turn = true;


var print_connections = document.getElementById("print_connections");
var print_connection_string = "";

var X_connections = [];

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

var five_X_patterns = [['X','X','X','X','X']];
var strong_four_X_patterns = [['_','X','X','X','X','_']];
var weak_four_X_patterns = [['X','X','X','X'],['X','X','_', 'X', 'X'],['X','_','X', 'X', 'X'], ['X','X','X','_','X']];
var strong_three_X_patterns = [['_','X','X','X','_'], ['_','X','X','_','X','_'],['_','X','_', 'X', 'X', '_']];
var weak_three_X_patterns = [['O','X','X','X','_'],['_','X','X','X','O'],['_','X','X','_','X','O'],['O','X','X','_','X','_'],['_','X','_','X','X','O'],['O','X','_','X','X','_']];
var two_X_patterns = [['_','X','X','_'], ['_','X','_','X','_']];


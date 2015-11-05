
function list_connections(){
  var i;

  print_connection_string = "";
  for (i = 0; i<connections.length;i++){
    connections[i].print();
  }
}

//connection on board uniquely defined by starting board position (row,col), type, and pattern
function connection(type, pattern, row, col){
  this.type = type;
  this.pattern = pattern;
  this.row = row;
  this.col = col;
  this.print = function() {
    print_connection_string += this.type + " ";
    print_connection_string += this.pattern + " ";
    print_connection_string +=  this.row.toString() + " ";
    print_connection_string +=  this.row.toString() + "\n"; 
    print_connections.textContent = print_connection_string;
  }
}

connection.prototype.equals = function (con) {
  if (this.type != con.type){
    return false;
  }
  else if(this.row != con.row){
    return false;
  }
  else if (this.col != con.col){
    return false;
  }
  else{
    return this.pattern.equals(con.pattern);
  }
}


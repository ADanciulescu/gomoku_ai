
function list_X_connections(){
  var i;

  print_connection_string = "";
  for (i = 0; i<X_connections.length;i++){
    X_connections[i].print();
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
    print_connection_string +=  this.col.toString() + "\n"; 
    print_connections.textContent = print_connection_string;
  }
  this.draw = function() {
    if(this.type == 'h'){
      ctx.moveTo(this.col*square_size,this.row*square_size + square_size/2);
      ctx.lineTo((this.col+this.pattern.length)*square_size , this.row * square_size + square_size/2);
      ctx.stroke(); 
    }
    else if (this.type == 'v'){
      ctx.moveTo(this.col*square_size + square_size/2,this.row*square_size);
      ctx.lineTo((this.col+0.5)*square_size , (this.row + this.pattern.length) * square_size);
      ctx.stroke(); 
    }
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


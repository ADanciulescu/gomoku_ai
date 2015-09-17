// attach the .equals method to Array's prototype to call it on any array
Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time
    if (this.length != array.length)
        return false;

    for (var i = 0, l=this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i]))
                return false;
        }
        else if (this[i] != array[i]) {
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;
        }
    }
    return true;
};

// 5 pattern

function check_for_pattern(pattern, XorO, row, col){
    var start = find_first_occurance(pattern,XorO);
    var end = find_last_occurance(pattern,XorO);
    var box_size = pattern.length + (end-start);



    // horizontal check
    var box_index = 0;
    var box_offset =  Math.max(col - ((box_size-1)/2), 0);
    var data = [];
    while (box_index < box_size-pattern.length){
        i = 0;
        for(i = 0; i<pattern.length; i++){
            data[i] =  board[box_offset+box_index+i][row] ;
        }
        if(data.equals(pattern)){
            return true
        }
        box_index++;
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
var board = ["EMPTY", "EMPTY", "EMPTY", "EMPTY", "EMPTY", "EMPTY", "EMPTY", "EMPTY", "EMPTY"];
var openingMove = 0;
var str = "a";


function userClick(button) {

    //Get the square the user cicked
    var userSquare = button.value;
    if (board[userSquare] != "EMPTY") {
        alert("That square is already taken. Try again");
    } else {
        //Update board and display user move on the board
        board[userSquare] = "X";
        button.innerHTML = "X";
        //Check to see if the user won
        if (userWins(board)) {
            alert("You got skills! You win!");
            location.reload(true);

        } else if (!isFull(board)) {
            //Get computer move and update board
            var computerSquare = getComputerMove();
            board[computerSquare] = "O";

            //Add a "a" to the front of the computer square to get the button id
            computerSquare = str.concat(computerSquare);
            //Get the selected computer button and display the move on the board
            var computerButton = document.getElementById(computerSquare);
            computerButton.innerHTML = "O";

            //Check to see if the computer wins
            if (computerWins(board)) {
                alert("You lost. Step your game up!");
                location.reload(true);
            }

        } else {
            alert("Cat Game");
            location.reload(true);
        }
    }
}


//This fucntion is used to get the computer move
function getComputerMove() {
    var square;

    //this if block takes care of the opening move
    if (openingMove == 0) {
        //If user selects a corner AI selects the center
        if (board[0] == "X" || board[2] == "X" || board[6] == "X" || board[8] == "X") {
            square = 4;
        }
        //If user selects an edge AI selects the cetner
        else if (board[1] == "X" || board[3] == "X" || board[7] == "X" || board[5] == "X") {
            square = 4;
        }
        //If user selects the center AI select the upper left corner
        else {
            square = 0;
        }
        //increment so the openingMove block doesn't get executed again
        openingMove++;

        //This block takes care of non-opening moves
    } else {
        //Check for a win
        var check1 = checkForTwo("O");
        var check2 = checkForTwo("X");
        if (check1[0]) {
            square = check1[1];
            //If we can't win check to see if we need to block
        } else if (check2[0]) {
            square = check2[1];
            //Otherwise take center if available
        } else if (board[4] == "EMPTY") {
            square = 4;
            //Otherwise take an empty corner if available
        } else if (board[0] == "EMPTY") {
            square = 0;
        } else if (board[8] == "EMPTY") {
            square = 8;
        } else if (board[2] == "EMPTY") {
            square = 2;
        } else if (board[6] == "EMPTY") {
            square = 6;
            //Otherwise take an open square
        } else {
            for (var j = 8; j >= 0; j--) {
                console.log(j);
                if (board[j] == "EMPTY") {
                    square = j;
                    break;
                }
            }
        }
    }
    return square;
}



//Checks to see if the player has two in a row. Returns true or false. If true also returns the board position.
function checkForTwo(player) {
    var shouldMark;
    if (board[0] == "EMPTY" && ((board[1] == player && board[2] == player) || (board[4] == player && board[8] == player) || (board[3] == player && board[6] == player))) {
        shouldMark = [true, 0];
    } else if (board[1] == "EMPTY" && ((board[0] == player && board[2] == player) || (board[4] == player && board[7] == player))) {
        shouldMark = [true, 1];
    } else if (board[2] == "EMPTY" && ((board[0] == player && board[1] == player) || (board[4] == player && board[6] == player) || (board[5] == player && board[8] == player))) {
        shouldMark = [true, 2];
    } else if (board[3] == "EMPTY" && ((board[0] == player && board[6] == player) || (board[4] == player && board[5] == player))) {
        shouldMark = [true, 3];
    } else if (board[4] == "EMPTY" && ((board[0] == player && board[8] == player) || (board[1] == player && board[7] == player) || (board[2] == player && board[6] == player) || (board[3] == player && board[5] == player))) {
        shouldMark = [true, 4];
    } else if (board[5] == "EMPTY" && ((board[2] == player && board[8] == player) || (board[3] == player && board[4] == player))) {
        shouldMark = [true, 5];
    } else if (board[6] == "EMPTY" && ((board[0] == player && board[3] == player) || (board[2] == player && board[4] == player) || (board[7] == player && board[8] == player))) {
        shouldMark = [true, 6];
    } else if (board[7] == "EMPTY" && ((board[1] == player && board[4] == player) || (board[6] == player && board[8] == player))) {
        shouldMark = [true, 7];
    } else if (board[8] == "EMPTY" && ((board[0] == player && board[4] == player) || (board[2] == player && board[5] == player) || (board[6] == player && board[7] == player))) {
        shouldMark = [true, 8];
    } else {
        //If false the second entry in the array wont be used
        shouldMark = [false, 0];
    }
    return shouldMark;
}


//Check to see if the board is full
function isFull(array) {
    var result = true;
    for (var index = 0; index < array.length; index++) {
        if (array[index] == "EMPTY") {
            result = false;
            break;
        }
    }
    return result;
}

//check to see if X has 3 in a row
function userWins(array) {
    var win = false;
    for (var i = 0; i < array.length; i++) {
        if (array[0] == "X" && array[1] == "X" && array[2] == "X") {
            win = true;
        } else if (array[3] == "X" && array[4] == "X" && array[5] == "X") {
            win = true;
        } else if (array[6] == "X" && array[7] == "X" && array[8] == "X") {
            win = true;;
        } else if (array[0] == "X" && array[4] == "X" && array[8] == "X") {
            win = true;
        } else if (array[2] == "X" && array[4] == "X" && array[6] == "X") {
            win = true;
        } else if (array[0] == "X" && array[3] == "X" && array[6] == "X") {
            win = true;
        } else if (array[1] == "X" && array[4] == "X" && array[7] == "X") {
            win = true;
        } else if (array[2] == "X" && array[5] == "X" && array[8] == "X") {
            win = true;
        }
    }
    return win;
}

//Check to see if O has 3 in a row
function computerWins(array) {
    var win = false;
    for (var i = 0; i < array.length; i++) {
        if (array[0] == "O" && array[1] == "O" && array[2] == "O") {
            win = true;
        } else if (array[3] == "O" && array[4] == "O" && array[5] == "O") {
            win = true;
        } else if (array[6] == "O" && array[7] == "O" && array[8] == "O") {
            win = true;
        } else if (array[0] == "O" && array[4] == "O" && array[8] == "O") {
            win = true;
        } else if (array[2] == "O" && array[4] == "O" && array[6] == "O") {
            win = true;
        } else if (array[0] == "O" && array[3] == "O" && array[6] == "O") {
            win = true;
        } else if (array[1] == "O" && array[4] == "O" && array[7] == "O") {
            win = true;
        } else if (array[2] == "O" && array[5] == "O" && array[8] == "O") {
            win = true;
        }
    }
    return win;
}
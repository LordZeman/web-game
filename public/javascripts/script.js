var redPositions = [];
var yellowPositions = [];

var board = [["", "", "", "", "", ""], ["", "", "", "", "", ""], ["", "", "", "", "", ""], ["", "", "", "", "", ""], ["", "", "", "", "", ""], ["", "", "", "", "", ""], ["", "", "", "", "", ""]];

var nextFree = [0, 0, 0, 0, 0, 0, 0];

var turn = "red";

// TODO:
// Make the turns work online
// Make the game actually know when an individual player has won
// Block one players action's while it is the other player's turn




$(document).ready(function() {
    $("#win-message").hide();

    $(".grid-slot").hover(function () {
        let xCoord = parseInt(filterID(this.id)[0]);
        $("#slot-" + xCoord + "-" + nextFree[xCoord]).css("border", "1px solid " + turn);
        // updateBoard();
    }, function () {
        let xCoord = parseInt(filterID(this.id)[0]);
        $("#slot-" + xCoord + "-" + nextFree[xCoord]).css("border", "1px solid black");
    });

    $(".grid-slot").mousedown(function () {
        let xCoord = parseInt(filterID(this.id)[0]);

        insertAt(xCoord);

        updateBoard();
        console.log(isGameWon());
        if (isGameWon()) {
            $("#win-message").show();
        }
    });

    $("#time-elapsed").html("Time elapsed: 00:00");

    var sec = 0;
    function pad ( val ) { return val > 9 ? val : "0" + val; }
    setInterval( function(){
        $("#time-elapsed").html("Time elapsed: " + pad(parseInt(++sec/60,10)) + ":" + pad(sec%60));
    }, 1000);
});



// $(".grid-slot").hover(function () {
//     if ($(this).css("background-color") != "red") {
//         $(this).css("background-color", "darkred");
//     }
// }, function () {
//     let coords = filterID(this.id)
//     if (board[coords[0]][coords[1]] != "red") {
//         $(this).css("background-color", "rgb(38, 48, 49)");
//     }
//     updateBoard();
// });

function updateBoard() {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] == "red") {
                $("#slot-" + i + "-" + j).css("background-color", "red");
            }
            if (board[i][j] == "yellow") {
                $("#slot-" + i + "-" + j).css("background-color", "yellow");
            }
        }
    }
}

function isGameWon() {
    return isGameWonHorizontal() || isGameWonVertical() || isGameWonDiagonal1();
    // return isGameWonDiagonal1();
}

function isGameWonDiagonal1() {
    return (
        board[0][0] && board[1][1] && board[2][2] && board [3][3]
    ) || (
        board[1][0] && board[2][1] && board[3][2] && board [4][3]
    ) || (
        board[2][0] && board[3][1] && board[4][2] && board [5][3]
    ) || (
        board[0][1] && board[1][2] && board[2][3] && board [3][4]
    ) || (
        board[1][1] && board[2][2] && board[3][3] && board [4][4]
    ) || (
        board[2][1] && board[3][2] && board[4][3] && board [5][4]
    ) || (
        board[0][2] && board[1][3] && board[2][4] && board [3][5]
    ) || (
        board[1][2] && board[2][3] && board[3][4] && board [4][5]
    ) || (
        board[2][2] && board[3][3] && board[4][4] && board [5][5]
    ) == "red";
}

function isGameWonDiagonal2() { // not yet flipped from first diagonal
    return (
        board[0][0] && board[1][1] && board[2][2] && board [3][3]
    ) || (
        board[1][0] && board[2][1] && board[3][2] && board [4][3]
    ) || (
        board[2][0] && board[3][1] && board[4][2] && board [5][3]
    ) || (
        board[0][1] && board[1][2] && board[2][3] && board [3][4]
    ) || (
        board[1][1] && board[2][2] && board[3][3] && board [4][4]
    ) || (
        board[2][1] && board[3][2] && board[4][3] && board [5][4]
    ) || (
        board[0][2] && board[1][3] && board[2][4] && board [3][5]
    ) || (
        board[1][2] && board[2][3] && board[3][4] && board [4][5]
    ) || (
        board[2][2] && board[3][3] && board[4][4] && board [5][5]
    ) == "red";
}

function isGameWonHorizontal() {
    let inc = 0;
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 7; j++) {
            if (board[j][i] == "red") {
                inc++
                if (inc > 3) {
                    return true;
                }
            } else if (board[j][i] == "yellow") {
                inc = 0;
            }
        }
        inc = 0;
    }
    return false;
}

function isGameWonVertical() {
    let inc = 0;
    for (let i = 0; i < 7; i++) {
        for (let j = 0; j < 6; j++) {
            if (board[i][j] == "red") {
                inc++
                if (inc > 3) {
                    return true;
                }
            } else if (board[j][i] == "yellow") {
                inc = 0;
            }
        }
        inc = 0;
    }
    return false;
};

function filterID(id) {
    return id.replace("slot-", "").replace("-", "");
}

function insertAt(x) {
    if (nextFree[x] < 6) { // turn can be red or yellow depending on turn
        board[x][nextFree[x]] = turn;
        
        $("#slot-" + x + "-" + nextFree[x]).toggleClass("drop-chip");
        nextFree[x]++;
        swapPlayerTurn();
    }
}

function swapPlayerTurn() {
    $("#your-turn").toggleClass("turn-highlight");
    $("#opponent-turn").toggleClass("turn-highlight");
    if (turn == "red") {
        turn = "yellow";
    } else if (turn == "yellow") {
        turn = "red";
    }
}
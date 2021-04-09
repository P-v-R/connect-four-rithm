"use strict";

/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

// makes a gameboard with X- heigh arrays containing (y/width) elements of null
function makeBoard() {
  for (let i = 0; i < HEIGHT; i++) {
    let column = [];
    for (let k = 0; k < WIDTH; k++) {
      column.push(null);
    }
    board.push(column);
  }
  console.log(board);
}

/** makeHtmlBoard: make HTML table and row of column tops. */
function makeHtmlBoard() {
  const htmlBoard = document.getElementById("board");
  
  // creates variable for the top row of the table which holds clicker functionality to select a column to drop your piece
  var selectorRow = document.createElement("tr");
  selectorRow.setAttribute("id", "column-top");
  selectorRow.addEventListener("click", handleClick);
  htmlBoard.appendChild(selectorRow);

  // creates table cell elements for the first selector row of the table as defined above
  for (var x = 0; x < WIDTH; x++) {
    var headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    selectorRow.append(headCell);
  }

  // dynamically creates the main part of html board, starting with HEIGHT
  for (let y = 0; y < HEIGHT; y++) {
    let tableRow = document.createElement("tr");
  // for each array of height, append WIDTH worth of td elements
    for (let x = 0; x < WIDTH; x++) {
      let tableCell = document.createElement("td");
      tableCell.setAttribute("id", `${y}-${x}`);
      tableRow.appendChild(tableCell);
    }
    htmlBoard.appendChild(tableRow);
  }
}

// for each user selection, find the highest spot in the column not occupied by a player piece
function findSpotForCol(x) {
  for (let i = HEIGHT - 1; i > 0; i--) {
    if (board[i][x] === null) {
      return i;
    }
  }
  return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */
function placeInTable(y, x) {
  //make a 'piece' with appropiot player color
  let piece = document.createElement("div");
  if (currPlayer === 1) {
    piece.style.backgroundColor = "blue";
    piece.classList.add("piece", "p1");
  } else {
    piece.style.backgroundColor = "red";
    piece.classList.add("piece", "p2");
  }

  let placementSpot = document.getElementById(`${y}-${x}`);
  placementSpot.append(piece);
}


/** endGame: announce game end */
function endGame(msg) {
 alert("game over");
 console.log("endGame ran");
}

/** handleClick: handle click of column top to play piece */
function handleClick(evt) {


  // get x from ID of clicked cell
  let x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece on board script and also on html board
  board[y][x] = currPlayer;
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  let isFull = board.every(function (arr) { !arr.includes(null) })
  if (isFull === true) {
    endGame()
  }
  // switch players
  // TODO: switch currPlayer 1 <-> 2
  // id player === 1, set player === 2, vice verse 
  currPlayer = (currPlayer === 1) ? 2 : 1;
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {

  /** _win:
   * takes input array of 4 cell coordinates [ [y, x], [y, x], [y, x], [y, x] ]
   * returns true if all are legal coordinates for a cell & all cells match
   * currPlayer
   */
  function _win(cells) {

    // TODO: Check four cells to see if they're all legal & all color of current
    // player
    //for each subarray in cells, check if the corresponding color is the same

  }

  for (var y = 0; y < HEIGHT; y++) {
    for (var x = 0; x < WIDTH; x++) {
     
      // all possible win combos
      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      let diagDL = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      let diagDR = [[y, x], [y - 1, x + 1], [y - 2, x + 2], [y - 3, x + 3]];

      // find winner (only checking each win-possibility as needed)
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();

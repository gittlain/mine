'use strict'

// Support 3 levels of the game
// o Beginner (4 * 4 with 2 MINES)
// o Medium (8 * 8 with 14 MINES)
// o Expert (12 * 12 with 32 MINES)

var gBoard

var cellContent = {
    minesAroundCount: 0,
    isRevealed: false,
    isMine: false,
    isMarked: false
}

var gGame = {
    inOn: false, //true when the game is on
    revealedCount: 0, //how many cells are revealed
    markedCount: 0, //flags on
    secsPassed: 0, //time passed
}

var gLevel = {
    SIZE: 4,
    MINES: 2,
}

function createBoard(size) {
    var board = []
    for (var i = 0; i < size; i++) {
        board[i] = []
        for (var j = 0; j < size; j++) {
            board[i][j] = {
                minesAroundCount: 0,
                isRevealed: false,
                isMine: false,
                isMarked: false
            }
        }
    }
    return board
}


function renderBoard(mat, selector) {
    var strHTML = '<table>'
    strHTML += `
      <thead>
        <tr>
          <th colspan="${mat[0].length}">
            <img class="emogi" src="img/happy.png" style="height:40px;">
          </th>
        </tr>
      </thead>`
    strHTML += '<tbody>'
    for (var i = 0; i < mat.length; i++) {
        strHTML += '\n<tr>'
        for (var j = 0; j < mat[0].length; j++) {
            const className = `cell cell-${i}-${j}`
            strHTML += `<td class="${className}" onclick="onCellClicked(this, ${i}, ${j})"></td>`
        }
        strHTML += '\n</tr>'
    }
    strHTML += '\n</tbody></table>'

    const elContainer = document.querySelector(selector)
    elContainer.innerHTML = strHTML
}


function placeMines(board, minesCount) {
    var size = board.length
    var minesPlaced = 0

    while (minesPlaced < minesCount) {
        var i = Math.floor(Math.random() * size)
        var j = Math.floor(Math.random() * size)

        if (!board[i][j].isMine) {
            board[i][j].isMine = true
            minesPlaced++
        }
    }
}


function setMinesNegsCount(board) {

    // Count mines around each cell
    // and set the cell's
    // minesAroundCount.

    const size = board.length

    for (var i = 0; i < size; i++) {
        for (var j = 0; j < size; j++) {
            if (board[i][j].isMine) continue
            var count = 0
            // 8
            for (var x = i - 1; x <= i + 1; x++) {
                if (x < 0 || x >= size) continue
                for (var y = j - 1; y <= j + 1; y++) {
                    if (y < 0 || y >= size) continue
                    if (x === i && y === j) continue
                    if (board[x][y].isMine) count++
                }
            }
            board[i][j].minesAroundCount = count
        }
    }
}

function setLevelAndRestart(size, mines) {
    gLevel.SIZE = size
    gLevel.MINES = mines
    gBoard = createBoard(size)
    placeMines(gBoard, mines)
    setMinesNegsCount(gBoard)  
    renderBoard(gBoard, '.main-board')
}

function onCellClicked(elCell, i, j) {
    const cell = gBoard[i][j]
    if (cell.isRevealed) return

    cell.isRevealed = true
    if (cell.isMine) {
        elCell.textContent = '💣'
        elCell.style.backgroundColor = 'lightcoral'

    } else if (cell.minesAroundCount > 0) {
        elCell.textContent = cell.minesAroundCount
        elCell.style.backgroundColor = 'lightgray'
    } else {
        elCell.style.backgroundColor = 'lightgray'

    }
}



//yet to//

function onRestart() {

}

function onCellMarked(elCell, i, j){
// Called when a cell is right-
// clicked
// See how you can hide the context
// menu on right click
}

function checkGameOver(){
//     The game ends when all mines
// are marked, and all the other
// cells are revealed

}

function expandReveal(board, elCell,i, j){
// When the user clicks a cell with
// no mines around, reveal not
// only that cell, but also its
// neighbors.
// NOTE: start with a basic
// implementation that only
// reveals the non-mine 1st degree
// neighbors
// BONUS: Do it like the real
// algorithm (see description at desc bellow

}


function unitTest(label, input, expected, actual) {
    var styleStr = (expected === actual) ? 'color: lightgreen;' : 'color: red'

    console.groupCollapsed(`%c${label}`, styleStr)

    console.log(`input: ${input}`)
    console.log(`expected: ${expected}`, typeof expected)
    console.log(`actual: ${actual}`, typeof actual)
    
    console.groupEnd()
}


function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive
}
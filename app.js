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

    var strHTML = '<table><tbody>'
    for (var i = 0; i < mat.length; i++) {

        strHTML += '\n<tr>'
        for (var j = 0; j < mat[0].length; j++) {

            const cell = mat[i][j]
            const className = `cell cell-${i}-${j}`
            const cellContent = cell.isMine ? '💣' : ''

            strHTML += `\n<td class="${className}">${cellContent}</td>`
        }
        strHTML += '\n</tr>'
    }
    strHTML += '\n</tbody></table>'

    console.log(strHTML)
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



function setLevelAndRestart(size, mines) {
    gLevel.SIZE = size
    gLevel.MINES = mines
    gBoard = createBoard(size)
    placeMines(gBoard, mines)
    console.table(gBoard)
    renderBoard(gBoard, '.main-board')
}





//yet to//

function onRestart() {

}

function setMinesNegsCount(board) {

// Count mines around each cell
// and set the cell's
// minesAroundCount.

}

function onCellClicked(elCell, i, j){
    // Called when a cell is clicked
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

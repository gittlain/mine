'use strict'


var gFirstClick = true
var gBoard

var gGame = {
    isOn: false,
    revealedCount: 0,
    markedCount: 0,
    secsPassed: 0,
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
                isMarked: false,
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
          <img class="emogi" src="img/happy.png" style="height:40px;" onclick="onRestart(this)">
        </th>
      </tr>
    </thead>`
    strHTML += '<tbody>'
    for (var i = 0; i < mat.length; i++) {
        strHTML += '\n<tr>'
        for (var j = 0; j < mat[0].length; j++) {
            const className = `cell cell-${i}-${j}`
            strHTML += `<td class="${className}" 
                     onclick="onCellClicked(this, ${i}, ${j})"
                     oncontextmenu="onCellMarked(event,this,${i},${j})"></td>`
        }
        strHTML += '\n</tr>'
    }
    strHTML += '\n</tbody></table>'

    const elContainer = document.querySelector(selector)
    elContainer.innerHTML = strHTML
}

function placeMines(board, minesCount, firstI, firstJ) {
    var size = board.length
    var minesPlaced = 0
    while (minesPlaced < minesCount) {
        var i = Math.floor(Math.random() * size)
        var j = Math.floor(Math.random() * size)

        if ((i === firstI && j === firstJ) || board[i][j].isMine) continue
        board[i][j].isMine = true
        minesPlaced++
    }
}

function setMinesNegsCount(board) {
    var size = board.length
    for (var i = 0; i < size; i++) {
        for (var j = 0; j < size; j++) {
            if (board[i][j].isMine) continue
            var count = 0
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
    gGame.isOn = true
    gGame.revealedCount = 0
    gGame.markedCount = 0
    gFirstClick = true
    renderBoard(gBoard, '.main-board')
}

function onCellClicked(elCell, i, j) {

    if (!gGame.isOn) return
    const cell = gBoard[i][j]
    if (cell.isRevealed || cell.isMarked) return

    if (gFirstClick) {
        placeMines(gBoard, gLevel.MINES, i, j)
        setMinesNegsCount(gBoard)
        gFirstClick = false
    }

    cell.isRevealed = true
    gGame.revealedCount++

    if (cell.isMine) {
        elCell.textContent = '💣'
        elCell.style.backgroundColor = 'lightcoral'
        revealAllMines()

        var elEmogi = document.querySelector('.emogi')
        elEmogi.src = "img/sad.png"

        gGame.isOn = false
        return
    }

    if (cell.minesAroundCount > 0) {
        elCell.textContent = cell.minesAroundCount
        elCell.style.backgroundColor = 'lightgray'
    } else {
        elCell.style.backgroundColor = 'lightgray'
        expandReveal(i, j)
    }

    checkGameOver()
}

function onCellMarked(ev, elCell, i, j) {
    ev.preventDefault()
    if (!gGame.isOn) return
    var cell = gBoard[i][j]
    if (cell.isRevealed) return

    cell.isMarked = !cell.isMarked
    elCell.textContent = cell.isMarked ? '🚩' : ''
    gGame.markedCount += cell.isMarked ? 1 : -1

    checkGameOver()
}

function expandReveal(i, j) {
    for (var x = i - 1; x <= i + 1; x++) {
        for (var y = j - 1; y <= j + 1; y++) {
            if (x < 0 || y < 0 || x >= gLevel.SIZE || y >= gLevel.SIZE) continue
            var neighbor = gBoard[x][y]
            if (!neighbor.isRevealed && !neighbor.isMine) {
                neighbor.isRevealed = true
                gGame.revealedCount++
                var elNeighbor = document.querySelector(`.cell-${x}-${y}`)
                elNeighbor.style.backgroundColor = 'lightgray'
                if (neighbor.minesAroundCount > 0) {
                    elNeighbor.textContent = neighbor.minesAroundCount
                } else {
                    expandReveal(x, y)
                }
            }
        }
    }
}

function revealAllMines() {
    for (var i = 0; i < gLevel.SIZE; i++) {
        for (var j = 0; j < gLevel.SIZE; j++) {
            if (gBoard[i][j].isMine) {
                var elCell = document.querySelector(`.cell-${i}-${j}`)
                elCell.textContent = '💣'
                elCell.style.backgroundColor = 'lightcoral'
            }
        }
    }
}

function checkGameOver() {
    var totalCells = gLevel.SIZE * gLevel.SIZE
    if (gGame.revealedCount === totalCells - gLevel.MINES) {
        document.querySelector('.emogi').src = "img/cool.png"
        gGame.isOn = false
        revealAllMines()
    }
}

function onRestart() {
    setLevelAndRestart(gLevel.SIZE, gLevel.MINES)
    document.querySelector('.emogi').src = "img/happy.png"
}





//

function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); 
}



async function makePlay(e) {
    if (!_isPlayable(e)) {
        return false
    }
    _updateAndCheck(e)
    if (end) {
        gameMsg.innerText = (marked === 8) ? `GAME TIED!` : `${turn} WON THE GAME!`
        return true
    }
    _switchTurn()
    _updateCurrentPlayerMsg()
}

function _isPlayable(e) {
    const p = e.childNodes[1]
    return (p.innerText === "")
}

function _switchTurn() {
    turn = (turn === 'X') ? 'O' : 'X'
}

function _updateDOM(e) {
    const p = e.childNodes[1]
    p.innerText = turn
}

function _updateCurrentPlayerMsg() {
    gameMsg.innerText = `Current player: ${turn}`
}

function _updateAndCheck(e) {
    _updateDOM(e)
    const p = boxes.findIndex(b => {
        return e.id === b.id
    })
    const row = Math.floor(p / 3)
    const col = (p % 3)
    grid[row][col] = turn
    marked++
    _checkIfWon(row, col)
}

function _checkIfWon(row, col) {
    if (grid[0][col] === grid[1][col] && grid[1][col] === grid[2][col]) {
        end = true
        return true
    }
    if (grid[row][0] === grid[row][1] && grid[row][1] === grid[row][2]) {
        end = true
        return true
    }
    if ((row === col) && grid[0][0] === grid[1][1] && grid[1][1] === grid[2][2]) {
        end = true
        return true
    }
    if ((row + col === 2) && grid[0][2] === grid[1][1] && grid[1][1] === grid[2][0]) {
        end = true
        return true
    }
    if(marked === 8){
        end = true
    }
}
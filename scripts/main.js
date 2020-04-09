const boxes = Array.from(document.getElementsByClassName("grid-item"))
const gameMsg = document.getElementById("game-state")
const grid = _initGrid()
let marked = 0
let turn = randomizeStart()
let end = false
gameMsg.innerText = `Current player: ${turn}`

boxes.forEach(e => {
    e.addEventListener('click', () => {
        if(!end){
            makePlay(e)
        }
    })
})

async function makePlay(e) {
    if (!_isPlayable(e)) {
        return false
    }
    _updateAndCheck(e)
    if (end) {
        if(marked === 8){
            gameMsg.innerText = `GAME TIED!`
        }
        else{
            gameMsg.innerText = `${turn} WON THE GAME!`
        }
        return true
    }
    _switchTurn()
    _updateMsg()
}

function _isPlayable(e) {
    const p = e.childNodes[1]
    return (p.innerText === "")
}

function _switchTurn() {
    turn = (turn === 'X') ? 'O' : 'X'
}

function _updateDom(e) {
    const p = e.childNodes[1]
    p.innerText = turn
}

function _updateMsg() {
    gameMsg.innerText = `Current player: ${turn}`
}

function _updateAndCheck(e) {
    _updateDom(e)
    const p = boxes.findIndex(b => {
        return e.id === b.id
    })
    const row = Math.floor(p / 3)
    const col = (p % 3)
    grid[row][col] = turn
    marked++
    _checkIfWon(row, col)
}

function _initGrid() {
    let g = []
    for (let i = 0; i < 3; i++) {
        g[i] = []
        for (let j = 0; j < 3; j++) {
            g[i][j] = ''
        }
    }
    return g
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

function randomizeStart(){
    return (Math.random() >= 0.5) ? 'X' : 'O' 
}
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

function randomizeStart(){
    return (Math.random() >= 0.5) ? 'X' : 'O' 
}
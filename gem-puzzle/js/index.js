let aboutGame = {
    InProgress: false,
    steps: 0,
    startGame: null,
    endGame: null,
    winCondition: []
}

initMatrix(4, 4);
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function () {
        if (document.querySelector('.game')) {
            clearField()
        }
        let size = button.getAttribute('data-size')
        initMatrix(size, size)
    })
});
let gameInProgress = false;
let steps = 0;
function clearField() {
    document.querySelector('.game').remove();
};

function initMatrix(x, y) {
    aboutGame.winCondition = []
    let mas = new Array(x)
    let i = 0;
    for (let row = 0; row < x; row++) {
        mas[row] = [];
        for (let col = 0; col < y; col++) {
            mas[row][col] = i;
            i++
            aboutGame.winCondition.push(i)
        }
    }
    aboutGame.winCondition.pop()
    aboutGame.winCondition.push(0)
    //sort
    for (let i = 0; i < mas.length; i++) {
        mas[i].sort(() => Math.random() - 0.5)
        mas.sort(() => Math.random() - 0.5)
    }

    renderField(mas)
}

function renderField(mas) {
    const field = document.createElement('div');
    const fieldBox = document.createElement('div')
    const game = document.createElement('div');
    field.classList.add('puzzleField')
    field.style.gridTemplateColumns = `repeat(${mas.length} , 80px)`
    field.style.gridTemplateRows = `repeat(${mas.length} , 80px)`
    document.body.prepend(game)
    game.classList.add('game');
    game.append(field)

    for (let i = 0; i < mas.length; i++) {
        for (let k = 0; k < mas.length; k++) {
            const fieldBox = document.createElement('div');
            if (mas[i][k] === 0) {
                fieldBox.classList.add('emptyBox');
            } else {
                fieldBox.classList.add('puzzleBox');
            }
            field.append(fieldBox);
            fieldBox.textContent = mas[i][k];
            fieldBox.id = `${i}-${k}`;
            fieldBox.setAttribute('data-box', 'box')
            fieldBox.setAttribute('name', 'box')
        }
    }

    const message = document.createElement('div');
    message.classList.add('message')
    message.textContent = `Hooray! You solved the puzzle in 
    ${new Date(new Date() - aboutGame.startGame).toLocaleTimeString().slice(3)} 
    and ${aboutGame.steps} moves!`;
    game.insertAdjacentElement("afterend" , message)

    game.addEventListener('click', (e) => {
        movePuzzle(e)
    });

}

function startTimer() {
    if (!aboutGame.InProgress) {
        aboutGame.InProgress = true,
            aboutGame.startGame = new Date();
    }
    aboutGame.steps++;


    
}

function checkWinCondition() {
    let arr = []
    let row = 0
    let col = 0
    for (let i = 0; i < 9; i++) {
        let current = document.getElementById(`${row}-${col}`);
        if (parseInt(current.textContent === 0)) continue
        arr.push(parseInt(current.textContent))
        if (row == 3 && col == 3) break;
        col++
        if (col == 3) {
            col = 0;
            row++
        }
    }
    for (let i = 0; i < aboutGame.winCondition.length; i++) {
        if (aboutGame.winCondition[i] !== arr[i]) {
            return false
        }
    }
    return true;
}

function movePuzzle(e) {
    startTimer()
    // console.log(new Date(new Date() - aboutGame.startGame).getMinutes())
    console.log(aboutGame)
    console.log(new Date(new Date() - aboutGame.startGame).toLocaleTimeString().slice(3))
    // console(new Date(new Date() - aboutGame.startGame))
    if (e.target.classList.contains('puzzleBox')) {
        let width = document.querySelector('.puzzleBox').clientWidth + 8;
        // console.dir(elementWidth)
        let pos = e.target.id.split('-');
        let row = parseInt(pos[0]);
        let col = parseInt(pos[1]);

        // moveTop
        if (document.getElementById(`${row - 1}-${col}`)?.textContent === '0') {
            e.target.style.transform += `translateY(-${width}px)`;
            document.getElementById(`${row - 1}-${col}`).style.transform += `translateY(${width}px)`;
            document.getElementById(`${row - 1}-${col}`).id = `${row}-${col}`;
            e.target.id = `${row - 1}-${col}`;

        }
        //moveDown
        if (document.getElementById(`${row + 1}-${col}`)?.textContent === '0') {
            e.target.style.transform += `translateY(${width}px)`;
            document.getElementById(`${row + 1}-${col}`).style.transform += `translateY(-${width}px)`;
            document.getElementById(`${row + 1}-${col}`).id = `${row}-${col}`;
            e.target.id = `${row + 1}-${col}`;


        }
        // moveLeft
        if (document.getElementById(`${row}-${col - 1}`)?.textContent === '0') {
            e.target.style.transform += `translateX(-${width}px)`;
            document.getElementById(`${row}-${col - 1}`).style.transform += `translateX(${width}px)`;
            document.getElementById(`${row}-${col - 1}`).id = `${row}-${col}`;
            e.target.id = `${row}-${col - 1}`;

        }
        //moveRight
        if (document.getElementById(`${row}-${col + 1}`)?.textContent === '0') {
            e.target.style.transform += `translateX(${width}px)`
            document.getElementById(`${row}-${col + 1}`).style.transform += `translateX(-${width}px)`;
            document.getElementById(`${row}-${col + 1}`).id = `${row}-${col}`;
            e.target.id = `${row}-${col + 1}`;
        }

        if (checkWinCondition()) {
            document.querySelector('.message').style.display = 'block';


        }
        // let win = checkWinCondition()
        // console.log(win)
    }

}


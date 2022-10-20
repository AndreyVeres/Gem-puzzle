
let aboutGame = {
    InProgress: false,
    steps: 0,
    startGame: null,
    endGame: null,
    winCondition: [],
    InProgress: false,
    size: 4,

}
initMatrix(4, 4);


function initMatrix(x, y) {
    if (document.querySelector('.wrapper')) {
        clearField()
    }
    aboutGame.winCondition = [];
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
function renderButtons(game) {
    const buttonBox = document.createElement('div');
    buttonBox.classList.add('buttons');
    game.prepend(buttonBox);
    for (let i = 0; i < 6; i++) {
        const button = document.createElement('button');
        button.textContent = `${i + 3}X${i + 3}`;
        button.setAttribute('data-size', i + 3)
        buttonBox.append(button)

        button.addEventListener('click', function () {
            if (document.querySelector('.wrapper')) {
                clearField()
            }
           
            let size = button.getAttribute('data-size');
            aboutGame.size = size;
           
            initMatrix(aboutGame.size, aboutGame.size)
        })

    }
}

function renderControls(game) {
    const controlsBox = document.createElement('div');
    controlsBox.classList.add('controls');
    game.prepend(controlsBox);
    const buttons = ['Stop', 'Reset', 'Save' ,'BestResults'];

    for (let i = 0; i < buttons.length; i++) {
        const button = document.createElement('button');
        button.textContent = buttons[i];
        button.classList.add(buttons[i])
        controlsBox.append(button)
    }

    document.querySelector('.Reset').addEventListener('click', function () {
        initMatrix(aboutGame.size, aboutGame.size);
    }) 
   
    
}

function renderField(mas) {
    const wrapper = document.createElement('div')
    const field = document.createElement('div');
    const fieldBox = document.createElement('div')
    const game = document.createElement('div');
    field.classList.add('puzzleField');
    field.style.gridTemplateColumns = `repeat(${mas.length} , calc(100% / ${mas.length}))`;
    wrapper.classList.add('wrapper')
    // document.body.prepend(game);
    document.body.prepend(wrapper);
    game.classList.add('game');
    game.append(field);
    wrapper.append(game)
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

        }
    }

    renderButtons(game)
    renderControls(game)

    game.addEventListener('click', (e) => {
        movePuzzle(e)
    });

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
    
    console.log(aboutGame.size)

    if (e.target.classList.contains('puzzleBox')) {
        startTimer()
        countSteps()
        
        let width = document.querySelector('.puzzleBox').clientWidth + 8;
        let height = document.querySelector('.puzzleBox').clientHeight + 8;
        // console.dir(elementWidth)
        let pos = e.target.id.split('-');
        let row = parseInt(pos[0]);
        let col = parseInt(pos[1]);

        // moveTop
        if (document.getElementById(`${row - 1}-${col}`)?.textContent === '0') {
            e.target.style.transform += `translateY(-${height}px)`;
            document.getElementById(`${row - 1}-${col}`).style.transform += `translateY(${height}px)`;
            document.getElementById(`${row - 1}-${col}`).id = `${row}-${col}`;
            e.target.id = `${row - 1}-${col}`;

        }
        //moveDown
        if (document.getElementById(`${row + 1}-${col}`)?.textContent === '0') {
            e.target.style.transform += `translateY(${height}px)`;
            document.getElementById(`${row + 1}-${col}`).style.transform += `translateY(-${height}px)`;
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
    }
}

function clearField() {
    document.querySelector('.wrapper').remove();
};

function startTimer() {
    if (!aboutGame.InProgress) {
        aboutGame.InProgress = true,
            aboutGame.startGame = new Date();
        let timerPlace = document.createElement('p');

    }

}
function countSteps() {
    aboutGame.steps++;
}


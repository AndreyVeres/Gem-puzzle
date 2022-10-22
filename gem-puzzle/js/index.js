
let aboutGame = {
    InProgress: false,
    steps: JSON.parse(localStorage.getItem('savedSteps')) || 0,
    timer: null,
    winCondition: [],
    InProgress: false,
    size: 4,

}


initMatrix(4, 4);


// finishGame()

function shuffleAndStart() {
    localStorage.removeItem('savedGame')
    localStorage.removeItem('savedTime')
    localStorage.removeItem('savedSteps')
    initMatrix(aboutGame.size, aboutGame.size)
    trackGame();
}

function save() {
    let time = document.querySelector('.timer').textContent
    const arr = [];
    for (let i = 0; i < aboutGame.size; i++) {
        arr[i] = [];
        for (let k = 0; k < aboutGame.size; k++) {
            arr[i].push(parseInt(document.getElementById(`${i}-${k}`).textContent))
        }
    }

    localStorage.setItem('savedGame', JSON.stringify(arr))
    localStorage.setItem('savedSteps', JSON.stringify(aboutGame.steps));
    localStorage.setItem('savedTime', JSON.stringify(time))

    const message = document.createElement('p');
    message.textContent = 'Game Saved'
    message.classList.add('message')
    document.querySelector('.buttons').insertAdjacentElement('afterend', message)

    setTimeout(() => {
        message.remove()
    }, 1000);
}

function sortPuzzle(mas) {
    for (let i = 0; i < mas.length; i++) {
        mas[i].sort(() => Math.random() - 0.5)
        mas.sort(() => Math.random() - 0.5)
    }

    let arr = JSON.parse(JSON.stringify(mas)).flat(1)
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === 0) continue;
        let current = arr[i];
        for (let k = i; k < arr.length; k++) {
            if (arr[k] === 0) continue
            if (arr[k] < current) sum += 1
        }
    }


    console.log(sum)
    if (sum % 2 === 0) return mas;
    else return sortPuzzle(mas)

}

function initMatrix(x, y) {
    aboutGame.steps = 0;
    clearInterval(aboutGame.timer)
    aboutGame.InProgress = false;
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

    mas = sortPuzzle(mas);


    if (localStorage.getItem('savedGame')) {
        renderField(JSON.parse(localStorage.getItem('savedGame')))
    } else {
        renderField(mas)
    }



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
            localStorage.removeItem('savedGame')
            localStorage.removeItem('savedTime')
            localStorage.removeItem('savedSteps')
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
    const buttons = ['Shuffle', 'Stop', 'Reset', 'Save', 'BestResults'];

    for (let i = 0; i < buttons.length; i++) {
        const button = document.createElement('button');
        button.textContent = buttons[i];
        button.classList.add(buttons[i])
        controlsBox.append(button)
    }

    document.querySelector('.Reset').addEventListener('click', function () {
        localStorage.removeItem('savedGame')
        localStorage.removeItem('savedTime')
        localStorage.removeItem('savedSteps')
        initMatrix(aboutGame.size, aboutGame.size);
    })

    document.querySelector('.Shuffle').addEventListener('click', function () {
        shuffleAndStart()
    })

    document.querySelector('.Save').addEventListener('click', function () {
        save()
    })



    renderStats(controlsBox)
}
function renderStats(controlsBox) {
    const statsBox = document.createElement('div');
    const timer = document.createElement('p');
    const steps = document.createElement('p');

    timer.textContent = localStorage.getItem('savedTime') ? JSON.parse(localStorage.getItem('savedTime')) : '00:00';
    steps.textContent = localStorage.getItem('savedSteps') ? JSON.parse(localStorage.getItem('savedSteps')) : 0;

    statsBox.classList.add('stats');
    timer.classList.add('timer');
    steps.classList.add('steps');
    statsBox.insertAdjacentElement('afterbegin' , timer);
    statsBox.insertAdjacentElement('afterbegin' , steps);

    controlsBox.insertAdjacentElement( 'afterend',statsBox);
}

function renderField(mas) {
    const wrapper = document.createElement('div')
    const field = document.createElement('div');
    const fieldBox = document.createElement('div')
    const game = document.createElement('div');
    field.classList.add('puzzleField');
    field.style.gridTemplateColumns = `repeat(${mas.length} , calc(100% / ${mas.length}))`;
    wrapper.classList.add('wrapper')

    document.body.prepend(wrapper);
    game.classList.add('game');
    game.append(field);
    wrapper.append(game)
    for (let i = 0; i < mas.length; i++) {
        for (let k = 0; k < mas.length; k++) {
            const fieldBox = document.createElement('div');
            if (mas[i][k] === 0) {
                fieldBox.classList.add('emptyBox', 'puzzleBox');
                // fieldBox.setAttribute('draggable', true)
            } else {
                fieldBox.classList.add('puzzleBox');
                fieldBox.setAttribute('draggable', true)

            }
            field.append(fieldBox);
            fieldBox.textContent = mas[i][k];
            fieldBox.id = `${i}-${k}`;
        }
    }


    renderButtons(game)
    renderControls(game)

    game.addEventListener('click', (e) => {
        movePuzzle(e)

    });
    game.addEventListener('dragstart', (e) => {
        dragAndDrop(e)

    });

    // document.querySelector('.puzzleField').addEventListener('click' , function() {
    //     console.log(mas)
    // })
}


function dragAndDrop(e) {
    let t = e
    let target = e.target

    const field = document.querySelector('.puzzleField');
    const emptyBox = document.querySelector('.emptyBox');

    setTimeout(() => {
        target.classList.add('hide');
    }, 0);

    let pos = target.id.split('-');
    let row = parseInt(pos[0]);
    let col = parseInt(pos[1]);
    let top = document.getElementById(`${row - 1}-${col}`)?.textContent === '0';
    let button = document.getElementById(`${row + 1}-${col}`)?.textContent === '0';
    let left = document.getElementById(`${row}-${col - 1}`)?.textContent === '0';
    let right = document.getElementById(`${row}-${col + 1}`)?.textContent === '0';

    let dragable = top || button || left || right

    target.addEventListener('dragend', function () {
        target.classList.remove('hide');
    })

    field.addEventListener('dragover', function (e) {
        e.preventDefault();
    })

    field.addEventListener('dragenter', function (e) {
        if (e.target.classList.contains('emptyBox') && dragable) {
            e.target.classList.add('hoveredGreen')
            e.target.classList.remove('hoveredRed')
        }
        if (e.target.classList.contains('emptyBox') && !dragable) {
            e.target.classList.add('hoveredRed')
            e.target.classList.remove('hoveredGreen')
        }

    })

    field.addEventListener('dragleave', function () {

    })

    field.addEventListener('drop', function (e) {
        movePuzzle(t)
        document.querySelector('.emptyBox').classList.remove('hoveredGreen', 'hoveredRed')
    }, { once: true })
}

function checkWinCondition() {  //REWORK
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

    if (e.target.classList.contains('puzzleBox')) {

        if (!aboutGame.InProgress) trackGame()

        let width = document.querySelector('.puzzleBox').clientWidth + 8;
        let height = document.querySelector('.puzzleBox').clientHeight + 8;

        let pos = e.target.id.split('-');
        let row = parseInt(pos[0]);
        let col = parseInt(pos[1]);

        // moveTop
        if (document.getElementById(`${row - 1}-${col}`)?.textContent === '0') {
            e.target.style.transform += `translateY(-${height}px)`;
            document.getElementById(`${row - 1}-${col}`).style.transform += `translateY(${height}px)`;
            document.getElementById(`${row - 1}-${col}`).id = `${row}-${col}`;
            e.target.id = `${row - 1}-${col}`;

            countSteps()
        }
        //moveDown
        if (document.getElementById(`${row + 1}-${col}`)?.textContent === '0') {
            e.target.style.transform += `translateY(${height}px)`;
            document.getElementById(`${row + 1}-${col}`).style.transform += `translateY(-${height}px)`;
            document.getElementById(`${row + 1}-${col}`).id = `${row}-${col}`;
            e.target.id = `${row + 1}-${col}`;
            countSteps()

        }
        // moveLeft
        if (document.getElementById(`${row}-${col - 1}`)?.textContent === '0') {
            e.target.style.transform += `translateX(-${width}px)`;
            document.getElementById(`${row}-${col - 1}`).style.transform += `translateX(${width}px)`;
            document.getElementById(`${row}-${col - 1}`).id = `${row}-${col}`;
            e.target.id = `${row}-${col - 1}`;
            countSteps()
        }
        //moveRight
        if (document.getElementById(`${row}-${col + 1}`)?.textContent === '0') {
            e.target.style.transform += `translateX(${width}px)`
            document.getElementById(`${row}-${col + 1}`).style.transform += `translateX(-${width}px)`;
            document.getElementById(`${row}-${col + 1}`).id = `${row}-${col}`;
            e.target.id = `${row}-${col + 1}`;
            countSteps()
        }

        if (checkWinCondition()) {
            finishGame()
        }
    }
}

function clearField() {
    document.querySelector('.wrapper').remove();
};

function finishGame() {

    aboutGame.InProgress = false;
    clearInterval(aboutGame.timer);

    const message = document.createElement('p');
    message.classList.add('message');
    document.querySelector('.game').insertAdjacentElement('afterbegin', message)
    message.textContent = `Hooray! You solved the puzzle in ${document.querySelector('.timer').textContent} and ${aboutGame.steps} moves!`

    const result = {
        steps: aboutGame.steps,
        time: document.querySelector('.timer').textContent,
        size: aboutGame.size,
        date: new Date()
    }

    localStorage.setItem('result', JSON.stringify(result))

}

function trackGame() {
    aboutGame.InProgress = true
    try {
        let time = JSON.parse(localStorage.getItem('savedTime')).split(':');
        timer(parseInt(time[0]), parseInt(time[1]))
    } catch {
        timer()
    }



}
function countSteps() {
    aboutGame.steps++;
    document.querySelector('.steps').textContent = `${aboutGame.steps}`
}

function timer(m = 0, s = 0) {
    let seconds = s;
    let minutes = m;
    aboutGame.timer = setInterval(() => {
        seconds++;
        if (seconds % 60 === 0) {
            minutes++
            seconds = 0
        }
        document.querySelector('.timer').textContent = `${addZero(minutes)}:${addZero(seconds)}`
    }, 1000);

}

function renderResults() {
}

function addZero(n) {
    if (n <= 9) {
        return `0${n}`
    }
    return n
}
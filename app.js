const squares = document.querySelectorAll('.square');
const mole = document.querySelector('.mole');
const timeLeft = document.querySelector('#time-left');
const score = document.querySelector('#score');
const restartBtn = document.querySelector('#restart');
const pauseBtn = document.querySelector('#pause');
const stopBtn = document.querySelector('#stop');



let result = 0;
let hitPosition = null;
let currentTime = 60;
let timerId = null;

//we want to get a random square to put our mole
function randomSquare(){
    squares.forEach( square => {
        square.classList.remove('mole');
    })

    let randomPosition = squares[Math.floor(Math.random() * 9)];
    randomPosition.classList.add('mole');

    hitPosition = randomPosition.id;
}

function moveMole(){
     timerId = setInterval(randomSquare, 500);
    // Set a timeout to stop the mole after a certain time
    setTimeout(() => {
        clearInterval(timerId);
        stopMole();
    }, 60000);
}


function pauseMole(){
    clearInterval(timerId);
}

function stopMole(){
    clearInterval(timerId);
    squares.forEach(square => {
        square.classList.remove('mole');
    });
    result = 0;
    currentTime = 60;
    updateScore();
    updateTime();
}

restartBtn.addEventListener('click', () => {
    moveMole();
});

pauseBtn.addEventListener('click', () => {
    pauseMole();
});

stopBtn.addEventListener('click', () => {
    stopMole();
});


function updateScore() {
    score.textContent = result;
}

function updateTime() {
    timeLeft.textContent = currentTime;
}

squares.forEach(square => {
    square.addEventListener('mousedown', () => {
        if(square.id == hitPosition ){
            result ++;
            updateScore();
            hitPosition = null;
        }
    })
})

function countDown(){
    currentTime--;
    timeLeft.textContent = currentTime;

    if(currentTime == 0){
        clearInterval(countDownTimerId);
        clearInterval(timerId);
        alert('Game Over! Your final score is: ' + result)
    }
}

let countDownTimerId = setInterval(countDown, 1000);




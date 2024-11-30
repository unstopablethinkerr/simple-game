const colors = ['red', 'green', 'blue', 'yellow', 'purple', 'orange'];
const gameBoard = document.getElementById('gameBoard');
const playerNameElement = document.getElementById('playerName');
const levelElement = document.getElementById('level');
const scoreElement = document.getElementById('score');
const timerElement = document.getElementById('timer');

let selectedColor = null;
let attempts = 0;
let level = 1;
let score = 0;
let timer = 60;
let playerName = '';
let gameInterval;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function createCell(color) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.style.backgroundColor = color;
    cell.addEventListener('click', () => selectColor(color));
    return cell;
}

function selectColor(color) {
    if (selectedColor === null) {
        selectedColor = color;
        alert(`Selected color: ${color}`);
    } else if (selectedColor === color) {
        alert('Correct! You matched the color.');
        selectedColor = null;
        attempts = 0;
        score += 10;
        updateScore();
        if (score % 50 === 0) {
            level++;
            updateLevel();
            clearInterval(gameInterval);
            initializeGame();
        }
    } else {
        alert('Incorrect! Try again.');
        selectedColor = null;
        attempts++;
        if (attempts >= 3) {
            alert('Game Over! Too many incorrect attempts.');
            document.location.reload();
        }
    }
}

function initializeGame() {
    gameBoard.innerHTML = '';
    const shuffledColors = shuffle([...colors, ...colors]);
    shuffledColors.forEach(color => {
        const cell = createCell(color);
        gameBoard.appendChild(cell);
    });
    timer = 60;
    updateTimer();
    gameInterval = setInterval(updateTimer, 1000);
}

function updateScore() {
    scoreElement.textContent = score;
}

function updateLevel() {
    levelElement.textContent = level;
}

function updateTimer() {
    timer--;
    timerElement.textContent = timer;
    if (timer <= 0) {
        clearInterval(gameInterval);
        alert('Time\'s up! Game Over.');
        document.location.reload();
    }
}

function startGame() {
    playerName = prompt('Enter your name:');
    if (playerName) {
        playerNameElement.textContent = playerName;
        initializeGame();
        updateScore();
        updateLevel();
    } else {
        alert('Please enter your name to start the game.');
        startGame();
    }
}

startGame();

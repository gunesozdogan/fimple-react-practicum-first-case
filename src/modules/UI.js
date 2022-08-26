import gameBoard from './game.js';

const UI = (function () {
    const myGameBoard = gameBoard;
    const squares = [...document.querySelectorAll('.icon-text')];
    const playerIconBtn = [...document.querySelectorAll('.icon')];
    const gameTypeBtn = document.querySelector('.game-type');
    const players = [...document.querySelectorAll('.player')];
    const overlay = document.querySelector('.overlay');
    let clicked = false;
    // PLACES CURRENT PLAYERS MARK WITH APPROPRIATE COLOR
    function placeIcon() {
        // DISABLES CLICKING ON SQUARES WHILE ITS IN PROGRESS
        if (clicked) return;
        clicked = true;

        const activePlayerDiv = document.querySelector('.active');
        const activePlayerIcon =
            activePlayerDiv.querySelector('button').textContent;
        const activePlayerName =
            activePlayerDiv.querySelector('span').textContent;

        const curRow = Number(this.className.split(' ')[0].split('-')[1]);
        const curColumn = Number(this.className.split(' ')[0].split('-')[2]);
        const gameType = document.querySelector('.game-type').textContent;
        const winnerText = document.querySelector('.winner-text');

        // IF ITS EMPTY SQUARE
        if (this.textContent === '') {
            renderIcon(this, activePlayerIcon);

            // UPDATES BOARD ARRAY
            myGameBoard.addMark(curRow, curColumn, activePlayerIcon);
            // DISPLAYS THE WINNER TEXT IF THE GAME IS FINISHED
            if (myGameBoard.checkWinner()) {
                displayWinnerText(activePlayerName);
                // DISPLAYS THE TIE MESSAGE IF ITS TIE
            } else if (myGameBoard.checkDraw()) {
                overlay.classList.remove('hidden');
                winnerText.textContent = 'The game is tie!';
                // AI'S TURN
            } else if (gameType.includes('AI')) {
                switchPlayer();
                return setTimeout(() => {
                    placeIconAI();
                    clicked = false;
                }, 1000);
            }
            switchPlayer();
            clicked = false;
        }
    }

    function placeIconAI() {
        const divAI = document.querySelector('.active');
        const iconAI = divAI.querySelector('button').textContent;
        let square, row, col;

        // PUTS MARK ON RANDOM PLACE
        do {
            row = Math.floor(Math.random() * 3);
            col = Math.floor(Math.random() * 3);
            square = document.querySelector(`.span-${row}-${col}`);
        } while (square.textContent !== '');

        renderIcon(square, iconAI);
        myGameBoard.addMark(row, col, iconAI);

        // CHECKS IF AI WON
        if (myGameBoard.checkWinner()) {
            displayWinnerText('AI');
        } else {
            switchPlayer();
        }
    }

    function renderIcon(element, icon) {
        element.textContent = icon;
        element.style.color = icon === 'X' ? '#FFF' : '#C3073F';
        element.style.transform = 'scale(1.4)';
        // SCALE ANIMATION
        setTimeout(() => {
            element.style.transform = 'scale(1)';
        }, 500);
    }

    function switchPlayer() {
        players.forEach((player) => player.classList.toggle('active'));
    }

    function displayWinnerText(name) {
        const winnerText = document.querySelector('.winner-text');
        const winnerIcon = myGameBoard.checkWinner();

        overlay.classList.remove('hidden');
        winnerText.textContent = `The winner is ${name} (${winnerIcon})`;
    }

    function removeWinnerText() {
        overlay.classList.add('hidden');
        restartGame();
    }

    function restartGame() {
        squares.forEach((square) => (square.textContent = ''));
        const player1 = document.querySelector('.player-1');
        const player2 = document.querySelector('.player-2');
        player1.classList.add('active');
        player2.classList.remove('active');
        myGameBoard.restartBoard();
    }

    // SWITCHES GAME TYPE
    function selectGameType() {
        const player2Name = document.querySelector('.player-2-name');
        if (gameTypeBtn.textContent === 'Player vs Player') {
            gameTypeBtn.textContent = 'Player vs AI';
            player2Name.textContent = 'AI';
        } else {
            gameTypeBtn.textContent = 'Player vs Player';
            player2Name.textContent = 'Player 2';
        }

        restartGame();
    }
    function selectIcon() {
        myGameBoard.switchIcons();
        const playerIcon1 = document.querySelector('.player-1-icon');
        const playerIcon2 = document.querySelector('.player-2-icon');

        playerIcon1.textContent = myGameBoard.playerIcons[0];
        playerIcon2.textContent = myGameBoard.playerIcons[1];

        restartGame();
    }

    // EVENT LISTENERS
    overlay.addEventListener('click', removeWinnerText);
    playerIconBtn.forEach((icon) => icon.addEventListener('click', selectIcon));
    gameTypeBtn.addEventListener('click', selectGameType);
    squares.forEach((square) => square.addEventListener('click', placeIcon));
})();

export default UI;

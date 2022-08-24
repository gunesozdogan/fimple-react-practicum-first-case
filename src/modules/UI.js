import gameBoard from './game.js';

const UI = (function () {
    const myGameBoard = gameBoard;
    const squares = [...document.querySelectorAll('.icon-text')];
    const playerIconBtn = [...document.querySelectorAll('.icon')];
    const gameTypeBtn = document.querySelector('.game-type');
    const players = [...document.querySelectorAll('.player')];

    // PLACES CURRENT PLAYERS MARK WITH APPROPRIATE COLOR
    function placeIconPlayer() {
        const activePlayerDiv = document.querySelector('.active');
        const activePlayerIcon =
            activePlayerDiv.querySelector('button').textContent;
        const activePlayerName =
            activePlayerDiv.querySelector('span').textContent;
        const curRow = Number(this.className.split(' ')[0].split('-')[1]);
        const curColumn = Number(this.className.split(' ')[0].split('-')[2]);

        this.textContent = activePlayerIcon;
        this.style.color = this.textContent === 'X' ? '#fff' : '#C3073F';

        // UPDATES BOARD ARRAY
        myGameBoard.addMark(curRow, curColumn, activePlayerIcon);
        // DISPLAYS THE WINNER TEXT IF THE GAME IS FINISHED
        if (myGameBoard.checkWinner()) {
            displayWinner(activePlayerName);
        }

        switchPlayer();
    }

    function switchPlayer() {
        players.forEach((player) => player.classList.toggle('active'));
    }

    function displayWinner(name) {
        const overlay = document.querySelector('.overlay');
        const winnerText = document.querySelector('.winner-text');
        const winnerIcon = myGameBoard.checkWinner();

        overlay.classList.remove('hidden');
        winnerText.textContent = `The winner is ${name} (${winnerIcon})`;
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
    }
    function selectIcon() {
        myGameBoard.switchIcons();
        const playerIcon1 = document.querySelector('.player-1-icon');
        const playerIcon2 = document.querySelector('.player-2-icon');

        playerIcon1.textContent = myGameBoard.playerIcons[0];
        playerIcon2.textContent = myGameBoard.playerIcons[1];
    }

    // EVENT LISTENERS
    playerIconBtn.forEach((icon) => icon.addEventListener('click', selectIcon));
    gameTypeBtn.addEventListener('click', selectGameType);
    squares.forEach((square) =>
        square.addEventListener('click', placeIconPlayer)
    );
})();

export default UI;

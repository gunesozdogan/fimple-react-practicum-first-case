export default UI;

import gameBoard from './game.js';

function UI() {
    const myGameBoard = gameBoard();
    const squares = [...document.querySelectorAll('.square')];
    const playerIconBtn = [...document.querySelectorAll('.icon')];
    const gameTypeBtn = document.querySelector('.game-type');
    const players = [...document.querySelectorAll('.player')];

    // PLACES CURRENT PLAYERS MARK WITH APPROPRIATE COLOR
    function placeIconPlayer(e) {
        const activePlayerDiv = document.querySelector('.active');
        const activePlayerIcon =
            activePlayerDiv.querySelector('button').textContent;
        const curSquare = this.querySelector('span');
        const curRow = Number(curSquare.className.split(' ')[0].split('-')[1]);
        const curColumn = Number(
            curSquare.className.split(' ')[0].split('-')[2]
        );

        curSquare.textContent = activePlayerIcon;
        curSquare.style.color =
            curSquare.textContent === 'X' ? '#fff' : '#C3073F';

        // UPDATES BOARD ARRAY
        myGameBoard.addMark(curRow, curColumn, activePlayerIcon);
        switchPlayer();
        console.log(myGameBoard.board);
        console.log(myGameBoard.checkWinner());
    }

    function switchPlayer() {
        players.forEach((player) => player.classList.toggle('active'));
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
}

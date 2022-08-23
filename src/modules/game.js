import UI from './UI.js';

const gameBoard = function () {
    let playerIcons = ['X', 'O'];
    const board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
    ];

    function switchIcons() {
        this.playerIcons =
            this.playerIcons[0] === 'X' ? ['O', 'X'] : ['X', 'O'];
    }

    function addMark(row, column, mark) {
        this.board[row][column] = mark;
    }

    function checkWinner() {
        let winner;

        // CHECKS EACH ROW
        for (let row = 0; row < 3; row++) {
            if (
                this.board[row][0] === this.board[row][1] &&
                this.board[row][0] === this.board[row][2]
            ) {
                winner = this.board[row][0];
                return winner;
            }
        }
        // CHECKS EACH COLUMN
        for (let col = 0; col < 3; col++) {
            if (
                this.board[0][col] === this.board[1][col] &&
                this.board[0][col] === this.board[2][col]
            ) {
                winner = this.board[0][col];
                return winner;
            }
        }

        // CHECKS DIAGONAL
        if (this.board[0][0] === this.board[1][1] && this.board[2][2]) {
            winner = this.board[0][0];
            return winner;
        } else if (
            this.board[2][0] === this.board[1][1] &&
            this.board[2][0] === this.board[0][2]
        ) {
            winner = this.board[2][0];
            return winner;
        }

        return winner;
    }

    return { playerIcons, switchIcons, addMark, board, checkWinner };
};

export default gameBoard;

/**
 * Implements the minimax algorithm to determine the best move for a player.
 * @param {Array} board - The current state of the game board.
 * @param {String} player - The player to calculate the score for.
 * @param {Boolean} isMaximizing - Indicates whether the player is maximizing or minimizing their score.
 * @returns {Number} - The best score for the player.
 */
export function minimax(board, player, isMaximizing) {
  // Check if there is a winner
  const result = calculateWinner(board);
  const scores = {
    X: 1,
    O: -1,
    draw: 0,
  };
  if (result) {
    return scores[result];
  }

  if (isMaximizing) {
    let bestScore = -Infinity;

    // Iterate over all possible moves
    for (let i = 0; i < board.length; i++) {
      if (!board[i]) {
        const newBoard = [...board];
        newBoard[i] = player;

        // Recursively calculate the score for the current move
        const score = minimax(newBoard, player, false);
        bestScore = Math.max(score, bestScore);
      }
    }

    return bestScore;
  } else {
    let bestScore = Infinity;

    // Iterate over all possible moves
    for (let i = 0; i < board.length; i++) {
      if (!board[i]) {
        const newBoard = [...board];
        newBoard[i] = player === "X" ? "O" : "X";

        // Recursively calculate the score for the current move
        const score = minimax(newBoard, player, true);
        bestScore = Math.min(score, bestScore);
      }
    }

    return bestScore;
  }
}

/**
 * Returns the best move for a given board state and player.
 * @param {Array} board - The current state of the board.
 * @param {String} player - The current player ('X' or 'O').
 * @param {Boolean} isMaximizing - Whether the player is maximizing or not.
 * @returns {Number} - The index of the best move.
 */
export function getBestMove(board, player, isMaximizing) {
  const availableMoves = [];
  for (let i = 0; i < board.length; i++) {
    if (!board[i]) {
      availableMoves.push(i);
    }
  }

  if (isMaximizing) {
    let bestScore = -Infinity;
    let bestMove = null;

    for (let i = 0; i < availableMoves.length; i++) {
      const move = availableMoves[i];
      const newBoard = [...board];
      newBoard[move] = player;
      const score = minimax(newBoard, player, false);
      if (score > bestScore) {
        bestScore = score;
        bestMove = move;
      }
    }

    return bestMove;
  } else {
    let bestScore = Infinity;
    let bestMove = null;

    for (let i = 0; i < availableMoves.length; i++) {
      const move = availableMoves[i];
      const newBoard = [...board];
      newBoard[move] = player === "X" ? "O" : "X";
      const score = minimax(newBoard, player, true);
      if (score < bestScore) {
        bestScore = score;
        bestMove = move;
      }
    }

    return bestMove;
  }
}

/**
 * Function to calculate the winner in a tic-tac-toe game.
 * @param {Array} squares - The current state of the tic-tac-toe board.
 * @returns {string|null} - The winner symbol ('X' or 'O') or null if there is no winner.
 */
export function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], // Horizontal rows
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], // Vertical columns
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], // Diagonals
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}

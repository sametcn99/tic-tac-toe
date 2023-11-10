// This function uses the minimax algorithm to determine the best move for a player in a game.
export function minimax(board, player, isMaximizing) {
  // Check if the game has a result (win/draw).
  const result = calculateWinner(board);

  // Define scores for X (player), O (opponent), and a draw.
  const scores = {
    X: 1,
    O: -1,
    draw: 0,
  };

  // If there's a result, return the corresponding score.
  if (result) {
    return scores[result];
  }

  // If the current player is maximizing, try to find the best move.
  if (isMaximizing) {
    let bestScore = -Infinity;
    // Iterate through the board positions.
    for (let i = 0; i < board.length; i++) {
      // If the position is available (empty), create a new board state.
      if (!board[i]) {
        const newBoard = [...board];
        newBoard[i] = player;
        // Recursively call minimax for the new board state.
        const score = minimax(newBoard, player, false);
        // Update the best score.
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore; // Return the best score for maximizing player.
  } else {
    // If the current player is minimizing, try to find the best move for the opponent.
    let bestScore = Infinity;
    for (let i = 0; i < board.length; i++) {
      if (!board[i]) {
        const newBoard = [...board];
        // Switch player to the opponent and create a new board state.
        newBoard[i] = player === "X" ? "O" : "X";
        const score = minimax(newBoard, player, true);
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore; // Return the best score for minimizing the opponent.
  }
}

// This function finds the best move for a player using the minimax algorithm.
export function getBestMove(board, player, isMaximizing) {
  const availableMoves = [];
  // Identify available moves (empty positions) on the board.
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
      // Update the best move and score if a better move is found.
      if (score > bestScore) {
        bestScore = score;
        bestMove = move;
      }
    }
    return bestMove; // Return the best move for maximizing player.
  } else {
    let bestScore = Infinity;
    let bestMove = null;
    for (let i = 0; i < availableMoves.length; i++) {
      const move = availableMoves[i];
      const newBoard = [...board];
      newBoard[move] = player === "X" ? "O" : "X";
      const score = minimax(newBoard, player, true);
      // Update the best move and score if a better move is found.
      if (score < bestScore) {
        bestScore = score;
        bestMove = move;
      }
    }
    return bestMove; // Return the best move for minimizing the opponent.
  }
}

// This function checks if there is a winner in the game by examining the board's state.
export function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  // Check for each winning combination on the board.
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]; // Return the winning player (X or O).
    }
  }

  return null; // Return null if there is no winner yet.
}

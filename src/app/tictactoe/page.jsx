"use client"; // This might be a specific directive or comment related to the development environment.
import React, { useState, useEffect, useCallback } from "react";
import { calculateWinner, getBestMove } from "./utils/utils";

export default function TicTacToe() {
  const initialBoard = Array(9).fill(null); // Create an initial game board with 9 empty squares
  const [board, setBoard] = useState(initialBoard); // Create a state variable to hold the game board
  const [xIsNext, setXIsNext] = useState(true); // Create a state variable to track whose turn it is (X or O)
  const [firstMove, setFirstMove] = useState(false); // Create a state variable to track if it's the first move

  const winner = calculateWinner(board); // Determine if there's a winner
  const isDraw = !winner && board.every((square) => square); // Check if it's a draw
  const status = winner
    ? `Winner: ${winner}`
    : isDraw
    ? "Draw!"
    : `${xIsNext ? "Computer's Turn" : "Your Turn"}`; // Determine the game status message

  const handleClick = useCallback(
    (index) => {
      if (calculateWinner(board) || board[index]) {
        return;
      }
      const newBoard = [...board]; // Create a copy of the current board
      newBoard[index] = xIsNext ? "X" : "O"; // Place X or O on the clicked square
      setBoard(newBoard); // Update the game board state
      setXIsNext(!xIsNext); // Toggle the turn to the next player
    },
    [board, xIsNext],
  );

  useEffect(() => {
    if (xIsNext && firstMove === false) {
      // If it's X's turn and it's the first move
      const randomIndex = Math.floor(Math.random() * 9); // Generate a random index
      handleClick(randomIndex); // Perform a random move
      setFirstMove(true); // Set firstMove to true to indicate that the first move has been made
    } else if (xIsNext) {
      // If it's X's turn and not the first move
      const bestMove = getBestMove(board, "O", xIsNext); // Calculate the best move for X
      handleClick(bestMove); // Perform the best move
    }
  }, [xIsNext, firstMove, handleClick, board]);

  const renderSquare = (index) => (
    // Render a square button
    <button
      key={index}
      className="flex justify-center items-center w-16 h-16 text-4xl font-bold border border-gray-300"
      onClick={() => handleClick(index)} // Call handleClick when the square is clicked
    >
      {board[index]} {/* Display the X or O on the square */}
    </button>
  );

  const handleRestart = () => {
    // Handle game restart
    setBoard(initialBoard); // Reset the game board
    setXIsNext(true); // Set X as the first player
    setFirstMove(false); // Reset the firstMove variable
  };

  return (
    <main className="flex justify-center items-center min-h-screen">
      <div className="mx-auto mt-10 w-60">
        <div className="mb-5 text-2xl font-bold text-white select-none">
          {status}
        </div>
        <div className="grid grid-cols-3 gap-2 text-white select-none">
          {Array.from({ length: 9 }, (_, index) => renderSquare(index))}
          {/* Render the game board with squares */}
        </div>
        <div className="flex justify-center mt-5 select-none">
          {(winner || isDraw) && (
            // Show the "Play Again" button if there's a winner or it's a draw
            <button
              className="py-2 px-4 text-white rounded select-none bg-zinc-800"
              onClick={handleRestart} // Call handleRestart when the button is clicked
            >
              Play Again
            </button>
          )}
        </div>
      </div>
    </main>
  );
}

"use client"; // This seems to be an import or configuration related to a specific tool or environment

import { useState, useEffect, useCallback } from "react"; // Importing necessary hooks from React
import { calculateWinner, getBestMove } from "@/app/utils/utils"; // Importing utility functions
import { FiRefreshCw } from "react-icons/fi"; // Importing a refresh icon

export default function Home() {
  const initialBoard = Array(9).fill(null); // Create an initial game board with 9 empty squares
  const [board, setBoard] = useState(initialBoard); // Create a state variable to hold the game board
  const [xIsNext, setXIsNext] = useState(true); // Create a state variable to track whose turn it is (X or O)
  const [firstMove, setFirstMove] = useState(false); // Create a state variable to track if it's the first move
  const [score, setScore] = useState({ X: 0, O: 0 }); // Create a state variable to track the score

  const winner = calculateWinner(board); // Determine if there's a winner
  const isDraw = !winner && board.every((square) => square); // Check if it's a draw
  const status = winner
    ? `Winner: ${winner}`
    : isDraw
    ? "Draw!"
    : `${xIsNext ? "Computer's Turn" : "Your Turn"}`; // Determine the game status message

  const handleClick = useCallback(
    (index: any) => {
      if (calculateWinner(board) || board[index]) {
        return;
      }
      const newBoard = [...board]; // Create a copy of the current board
      newBoard[index] = xIsNext ? "X" : "O"; // Place X or O on the clicked square
      setBoard(newBoard); // Update the game board state
      setXIsNext(!xIsNext); // Toggle the turn to the next player
    },
    [board, xIsNext]
  );

  const handleResetScore = () => {
    setScore({ X: 0, O: 0 }); // Reset the score
  };

  useEffect(() => {
    setScore((prevScore) => ({
      ...prevScore,
      [winner as "X" | "O"]: prevScore[winner as "X" | "O"] + 1,
    })); // Update the score based on the winner
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
  }, [xIsNext, firstMove, handleClick, board, winner]);

  const renderSquare = (index: any) => (
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
    <>
      <span className="flex flex-row text-2xl font-bold text-white select-none">
        <h1 className="mr-2">
          {score.X}-{score.O}
        </h1>
        <button
          className="px-2 transition-transform duration-700 transform scale-75 hover:rotate-90"
          onClick={handleResetScore} // Call handleResetScore when the button is clicked
        >
          <FiRefreshCw />
        </button>
      </span>
      <span className="mb-5 text-2xl font-bold text-white select-none">
        {/*Display the game status*/}
        {status}
      </span>
      <section className="grid grid-cols-3 gap-3 text-white select-none">
        {Array.from({ length: 9 }, (_, index) => renderSquare(index))}
        {/* Render the game board with squares */}
      </section>
      <span className="flex justify-center mt-5 select-none">
        {(winner || isDraw) && (
          // Show the "Play Again" button if there's a winner or it's a draw
          <button
            className="absolute py-2 px-4 text-white rounded transition duration-300 select-none bg-zinc-800 hover:bg-zinc-900"
            onClick={handleRestart} // Call handleRestart when the button is clicked
          >
            Play Again
          </button>
        )}
      </span>
    </>
  );
}

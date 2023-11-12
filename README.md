# Tic-Tac-Toe with AI README

This README provides an overview of the Tic-Tac-Toe game with AI implemented using React. This project includes a web-based Tic-Tac-Toe game that allows you to play against an AI opponent.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [How to Run](#how-to-run)
- [Game Logic](#game-logic)
- [AI Implementation](#ai-implementation)

## Introduction

Tic-Tac-Toe with AI is a web-based game built using React. The game provides a simple interface for playing Tic-Tac-Toe against an AI opponent. The game logic is implemented in JavaScript, and it uses the minimax algorithm to create a challenging AI opponent.

## Features

- Play Tic-Tac-Toe against an AI opponent.
- The AI uses the minimax algorithm to make smart moves.
- Keep track of the score between the player and the AI.
- Restart the game or reset the score with ease.

## How to Run

To run the Tic-Tac-Toe game on your local machine, follow these steps:

1. Make sure you have Node.js installed. If not, you can download it [here](https://nodejs.org/).

2. Clone the repository to your local machine:

```bash
git clone https://github.com/sametcn99/tic-tac-toe
```

3. Navigate to the project directory:

```bash
cd tic-tac-toe
```

4. Install the project dependencies:

```bash
npm i
```

5. Start the development server:

```bash
npm run dev
```

## Game Logic

The game logic is implemented in the `src/page.tsx` file. Here's a brief overview of how the game works:

- The game board is represented as an array with 9 elements, initially filled with `null`. Each element corresponds to a square on the board.

- The game keeps track of whose turn it is using the `xIsNext` state variable.

- User interactions are handled by the `handleClick` function, which updates the game board and checks for a winner or a draw.

- The game status, displayed at the top of the interface, informs the player whose turn it is or if the game has been won or is a draw.

- The `handleRestart` function allows the player to reset the game, and the `handleResetScore` function resets the score.

## AI Implementation

The AI in this game is implemented using the minimax algorithm, a well-known algorithm for finding the best move in two-player games. The key functions for the AI are located in the `src/utils/utils.js` file:

- `minimax(board, player, isMaximizing)`: This function recursively evaluates the game board to find the best move for the AI (maximizing player) or the opponent (minimizing player).

- `getBestMove(board, player, isMaximizing)`: This function identifies the best move for the AI to make using the minimax algorithm.

- `calculateWinner(squares)`: This function checks if there is a winner on the game board.

The AI takes into account all possible moves and their outcomes to make strategic decisions in the game.

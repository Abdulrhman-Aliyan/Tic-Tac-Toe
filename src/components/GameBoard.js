import React, { useState } from "react";

export default function GameBoard() {
  const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ];

  const [gameBoard, setGameBoard] = useState(initialGameBoard);
  const [currentPlayer, setCurrentPlayer] = useState("X"); // Start with player X
  const [winner, setWinner] = useState(null); // Keep track of the winner

  function checkWinner(board) {
    // Check rows
    for (let i = 0; i < 3; i++) {
      if (board[i][0] && board[i][0] === board[i][1] && board[i][0] === board[i][2]) {
        return board[i][0];
      }
    }
    // Check columns
    for (let i = 0; i < 3; i++) {
      if (board[0][i] && board[0][i] === board[1][i] && board[0][i] === board[2][i]) {
        return board[0][i];
      }
    }
    // Check diagonals
    if (board[0][0] && board[0][0] === board[1][1] && board[0][0] === board[2][2]) {
      return board[0][0];
    }
    if (board[0][2] && board[0][2] === board[1][1] && board[0][2] === board[2][0]) {
      return board[0][2];
    }
    // No winner
    return null;
  }

  function getWinningCombination(board) {
    // Check rows
    for (let i = 0; i < 3; i++) {
      if (board[i][0] && board[i][0] === board[i][1] && board[i][0] === board[i][2]) {
        return [[i, 0], [i, 1], [i, 2]]; // Return winning combination
      }
    }
    // Check columns
    for (let i = 0; i < 3; i++) {
      if (board[0][i] && board[0][i] === board[1][i] && board[0][i] === board[2][i]) {
        return [[0, i], [1, i], [2, i]]; // Return winning combination
      }
    }
    // Check diagonals
    if (board[0][0] && board[0][0] === board[1][1] && board[0][0] === board[2][2]) {
      return [[0, 0], [1, 1], [2, 2]]; // Return winning combination
    }
    if (board[0][2] && board[0][2] === board[1][1] && board[0][2] === board[2][0]) {
      return [[0, 2], [1, 1], [2, 0]]; // Return winning combination
    }
    // No winning combination
    return [];
  }

  function handleSelectSquare(rowIndex, colIndex) {
    if (gameBoard[rowIndex][colIndex] === null && !winner) { // Only allow selection if square is empty and no winner
      setGameBoard(prevGameBoard => {
        const updatedBoard = prevGameBoard.map((row, i) =>
          i === rowIndex ? row.map((cell, j) => (j === colIndex ? currentPlayer : cell)) : row
        );
        const winner = checkWinner(updatedBoard);
        if (winner) {
          setWinner(winner);
        }
        return updatedBoard;
      });

      // Toggle player after each turn
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    }
  }

  function highlightWinner(rowIndex, colIndex) {
    if (winner) {
      const winningCombination = getWinningCombination(gameBoard);
      for (let [row, col] of winningCombination) {
        if (row === rowIndex && col === colIndex) {
          return "red"; // Highlight winning combination cells
        }
      }
      return "lightgray"; // Other cells
    }
    return "inherit";
  }

  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button style={{color: highlightWinner(rowIndex, colIndex)}} onClick={() => handleSelectSquare(rowIndex, colIndex)}>{playerSymbol}</button>
              </li>
            ))}
          </ol>
        </li>
      ))}
      {winner && <p>Winner: {winner}</p>}
    </ol>
  );
}

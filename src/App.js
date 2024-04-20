import './App.css';
import Player from './components/Player';
import GameBoard from './components/GameBoard';
import Log from './components/Log';
import { WINNING_COMBINATIONS } from './components/winning-combinations';

import { useState } from 'react';
import GameOver from './components/GameOver';


const initialGameBoard = [
  [null,null,null],
  [null,null,null],
  [null,null,null],
];


function deriveActivePlayer(gameTurns) {
  let currentPlayer = 'X';

    if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
      currentPlayer = 'O';
    }

  return currentPlayer;
}

export default function App() {
  
  const [players, setPlayers] = useState({
    'X': 'Player 1',
    'O': 'Player 2'
  });

  const [gameTurns, setGameTurns] = useState([]);
  // const [hasWinner, setHasWinner] = useState(false);
  // const [activePlayer, setActivePlayer] = useState('X');

  const activePlayer = deriveActivePlayer(gameTurns);

   
  let gameBoard = [...initialGameBoard.map(array => [...array])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const {row, col} = square;

    gameBoard[row][col] = player;
  }

  let winner = null;

  for (const combinations of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combinations[0].row][combinations[0].column];
    const secondSquareSymbol = gameBoard[combinations[1].row][combinations[1].column];
    const thirdSquareSymbol = gameBoard[combinations[2].row][combinations[2].column];
    if (
        firstSquareSymbol && 
        firstSquareSymbol === secondSquareSymbol && 
        firstSquareSymbol === thirdSquareSymbol
       ) {
        winner = players[firstSquareSymbol];
       } 
  }

  const hasDraw = gameTurns.length === 9 && !winner ;

  function handleChange(rowIndex, colIndex) {
    // setActivePlayer((curActivePlayer) => curActivePlayer === 'X' ? 'O' : 'X' );
    setGameTurns(prevTurns => {
      
      const currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [
        { square: {row: rowIndex, col: colIndex}, player: activePlayer },
        ...prevTurns,
      ];

      return updatedTurns;
    });
  }

  function handleRestart() {
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers(prevPlayer => {
      return {
        ...prevPlayer,
        [symbol]: newName
      };
    });
  }

  return (
      <main>
       <div id="game-container">
        <ol id="players" className='highlight-player'>
          <Player initialName="Player 1" symbol="X" isActive={activePlayer === 'X'} onChangeName={handlePlayerNameChange} />
          <Player initialName="Player 2" symbol="O" isActive={activePlayer === 'O'} onChangeName={handlePlayerNameChange}/>
        </ol>

        { ( winner || hasDraw ) && <GameOver winner={winner} onRestart={handleRestart}/> }

        < GameBoard 
            onSelectSquare={handleChange} 
            board={gameBoard} 
        />

       </div>

       <Log turns={gameTurns}/>
      </main>
  );
}

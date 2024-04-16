import './App.css';
import Player from './components/Player';
import GameBoard from './components/GameBoard';
import Log from './components/Log';
import { WINNING_COMBINATIONS } from './components/winning-combinations';

import { useState } from 'react';


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

  const [gameTurns, setGameTurns] = useState([]);
  // const [hasWinner, setHasWinner] = useState(false);
  // const [activePlayer, setActivePlayer] = useState('X');

  const activePlayer = deriveActivePlayer(gameTurns);

   
  let gameBoard = initialGameBoard;

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const {row, col} = square;

    gameBoard[row][col] = player;
  }

  for (const combinations of WINNING_COMBINATIONS) {
    const firstSquareSymbol
    const secondSquareSymbol
    const thirdSquareSymbol
  }

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

  return (
      <main>
       <div id="game-container">
        <ol id="players" className='highlight-player'>
          <Player initialName="Player 1" symbol="X" isActive={activePlayer === 'X'} />
          <Player initialName="Player 2" symbol="O" isActive={activePlayer === 'O'}/>
        </ol>

        < GameBoard 
            onSelectSquare={handleChange} 
            board={gameBoard} />
       </div>

       <Log turns={gameTurns}/>
      </main>
  );
}

import './App.css';
import Player from './components/Player';
import GameBoard from './components/GameBoard';
import Log from './components/Log';

import { useState } from 'react';


export default function App() {

  const [gameTurns, setGameTurns] = useState([]);
  const [activePlayer, setActivePlayer] = useState('X');

  function handleChange() {
    setActivePlayer((curActivePlayer) => curActivePlayer === 'X' ? 'O' : 'X' );
    setGameTurns();
  }

  return (
      <main>
       <div id="game-container">
        <ol id="players" className='highlight-player'>
          <Player initialName="Player 1" symbol="X" isActive={activePlayer === 'X'} />
          <Player initialName="Player 2" symbol="O" isActive={activePlayer === 'O'}/>
        </ol>

        < GameBoard onSelectSquare  = {handleChange} activePlayerSymbol={activePlayer} />
       </div>

       <Log />
      </main>
  );
}

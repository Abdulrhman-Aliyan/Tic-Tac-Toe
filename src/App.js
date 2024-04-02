import logo from './logo.svg';
import './App.css';
import Player from './components/Player';


export default function App() {
  return (
      <main>
       <div id="game-container">
        <ol id="players">
          <Player name="Player 1" symbol="X"/>
          <Player name="Player 2" symbol="O"/>
        </ol>

        GAME BOARD
       </div>

       LOG
      </main>
  );
}

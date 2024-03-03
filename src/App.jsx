import { useState } from "react";
import GameBoard from "./componenets/GameBoard";
import Player from "./componenets/Player";
import Log from "./componenets/Log";
import { WINNING_COMBINATIONS} from './winning-combinations.js';
import GameOver from "./componenets/GameOver.jsx";

const initialGameBoard = [
  [null,null,null],
  [null,null,null],
  [null, null,null],
]

function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}


function App() {
  const [gameTurns, setGameTurns] = useState([]); // array of all game turns in the for
  const [playerName,  setPlayerName] = useState({
    'X': 'Player 1',
    'O':'Player 2'
  });
  
  const activePlayer = deriveActivePlayer(gameTurns);
  let gameBoard = [...initialGameBoard.map(array=>[...array])];

    for( const turn of gameTurns){
        const {square, player} = turn;
        const {row, col}= square;
        gameBoard[row][col]=player;
        
    }

    let winner = null;
    for(const combination of WINNING_COMBINATIONS){
      const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];      
      const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
      const thirdSquareSymbol  = gameBoard[combination[2].row][combination[2].column];
     
      if(firstSquareSymbol && firstSquareSymbol===secondSquareSymbol && firstSquareSymbol===thirdSquareSymbol){
        winner = playerName[firstSquareSymbol];
        
      }
    }

    const hasDraw = gameTurns.length===9 && !winner;
   
  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      let currentPlayer = deriveActivePlayer(prevTurns);
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];

      return updatedTurns;
    });
  }

  function handleRestart(){
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol,newName){
    setPlayerName(prevPlayers=>{
      return {...prevPlayers,
      [symbol]: newName}
    })
  }

  return (
    <>
      <main>
        <div id="game-container">
          <ol id="players" className="highlight-player">
            <Player
              name="player 1"
              symbol="X"
              isActive={activePlayer === "X"}
              onChangeName={handlePlayerNameChange}
            />
            <Player
              name="player 2"
              symbol="O"
              isActive={activePlayer === "O"}
              onChangeName={handlePlayerNameChange}
            />
          </ol>
          {(winner|| hasDraw) && <GameOver winner={winner} onRestart={handleRestart} />}
          <GameBoard
            onSelectSquare={handleSelectSquare}
            
            gameBoard={gameBoard}
          />
        </div>
        <Log turns={gameTurns} />
      </main>
    </>
  );
}

export default App;

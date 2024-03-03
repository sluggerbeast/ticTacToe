import React from "react";

function GameOver({winner,onRestart}) {
    console.log(winner);
  return (
    <div id="game-over">
      <h2>GameOver!</h2>
      {winner &&<p>{winner} won!</p>}
      {!winner && <p>Game Draw</p>}
      <p>
        <button onClick={onRestart}>Rematch!</button>
      </p>
    </div>
  );
}

export default GameOver;

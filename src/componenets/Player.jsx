import React, { useState } from "react";

function Player({ name, symbol, isActive,onChangeName }) {
  const [isEditing, setIsEditing] = useState(false);
  const [playerName, setPlayerName] = useState(name);

  function handleClick() {
    //console.log("button clicked");
    //setIsEditing(!isEditing); /// Not recommend when state depends on previous state insted do following;

    setIsEditing(prev=>!prev); /// this is recommended
    if (!isEditing) {
    onChangeName(symbol,playerName)}

  }

  return (
    <li className={isActive?'active':undefined}>
      <span className="player">
        {isEditing ? (
          <input
            type="text"
            required
            value={playerName}
            onChange={(e) => {
              setPlayerName(e.target.value);
            }}
            placeholder="your name"
          />
        ) : (
          <span className="player-name">{playerName}</span>
        )}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleClick}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}

export default Player;

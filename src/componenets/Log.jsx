import React from 'react'

function Log({turns}) {
  return (
    <>
    <ul id="log">
        {turns.length>0 && turns.map((turn)=>(<li key={`${turn.square.row}${turn.square.col}`}>Player {turn.player} selected {turn.square.row},{turn.square.col}</li>))}
        
    </ul>
    </>
  )
}

export default Log
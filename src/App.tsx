import { useState } from 'react'
import './App.css'
import { initialGameState, move, } from './game/game'

function App() {
  const [game, setGame] = useState(initialGameState())

  const clickCell = (row: number, col: number) => {
    setGame(prev => move(prev, row, col))
  }

  return (
    <div className="h-screen w-screen bg-black flex items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <div className="grid grid-cols-3 grid-rows-3 w-[300px] h-[300px]">
          {game.board.map((row, rowIndex) => 
            row.map((cell, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className="aspect-square border-2 border-white flex items-center justify-center text-5xl text-white cursor-pointer"
                //todo coords
                onClick={() => clickCell(rowIndex, colIndex)}
              >
                {cell}
              </div>
            ))
          )}
        </div>
        <div className="text-white text-xl h-6">
          {game.endState === 'x' || game.endState === 'o'
          ? `Player ${game.endState} wins!`
          : game.endState === 'tie'
          ? 'Tie game!'
          : <span className="invisible">Game in progress...</span>}
        </div>
      </div>
    </div>
  )
}

export default App

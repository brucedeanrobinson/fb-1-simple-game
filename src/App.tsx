import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [game, setGame] = useState()

  {/* todo: retrieve board/game state */}
  const board = [
    ['x', 'o', 'x'],
    ['x', 'o', 'x'],
    ['x', 'o', 'x']
  ]

  return (
    <div className="h-screen w-screen bg-black flex items-center justify-center">
      <div className="grid grid-cols-3 grid-rows-3 w-[300px] h-[300px]">
        {board.map((row, rowIndex) => 
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className="aspect-square border-2 border-white flex items-center justify-center text-5xl text-white cursor-pointer">
              {cell}
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default App

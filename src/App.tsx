import { useState } from 'react'
import './App.css'
import { InitialGameState } from './game/game'
import type { Board, EndState } from './game/game'

function App() {
  const [game, setGame] = useState(InitialGameState())

  const move = (row: number, col: number) => {

    // if clicked square is occupied, return
    if (game.board[row][col] || game.endState) return
    
    // set the game with a deconstructed game, newBoard, nextPlayer
    setGame((prevGame) => {
      // structuredClone the board
      const newGame = structuredClone(prevGame)
      // set the new board[row][col] to the current player (x | o)
      newGame.board[row][col] = prevGame.currentPlayer

      // set next player as the other with a ternary
      newGame.currentPlayer = prevGame.currentPlayer === 'x' ? 'o' : 'x'

      // check win condition
      newGame.endState = getEndState(newGame.board)

      return newGame
    })
  }

  const getEndState = (board: Board): EndState => {
    // check wins

    // check tie

    // else return null
    return null;
  }

  return (
    <div className="h-screen w-screen bg-black flex items-center justify-center">
      <div className="grid grid-cols-3 grid-rows-3 w-[300px] h-[300px]">
        {game.board.map((row, rowIndex) => 
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className="aspect-square border-2 border-white flex items-center justify-center text-5xl text-white cursor-pointer"
              onClick={() => move(rowIndex, colIndex)}
            >
              {cell}
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default App

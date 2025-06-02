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
    // row
    for (let i = 0; i < 3; i++) {
      const [a, b, c] = board[i]
      if (a && a === b && a === c) return a
    }

    //col
    for (let j = 0; j < 3; j++) {
      const a = board[0][j]
      const b = board[1][j]
      const c = board[2][j]
      if (a && a === b && a === c) return a
    }

    //diagonals
    const center = board[1][1]
    if (center && center === board[0][0] && center === board[2][2]) return center
    if (center && center === board[0][2] && center === board[2][0]) return center

    // check tie (board is full, so there isn't a win which would've been handled above)
    // loop thru every row, checking every cell for non-null
    if (board.every(row => row.every(cell => cell !== null))) return 'tie'

    // else return null
    return null;
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
                onClick={() => move(rowIndex, colIndex)}
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

import { useState, useEffect, useMemo } from 'react'
import './App.css'
import type { Coords, GameState } from './shared/types'
import { TicTacToeApiClient } from './services/TicTacToeApi'

function App() {
  // singleton
  const api = useMemo(() => new TicTacToeApiClient(), [])
  const [game, setGame] = useState<GameState | undefined>()

  /*** API Operations */

  async function initializeGame() {
    const initialState = await api.createGame()
    setGame(initialState)
  }

  // on App load, init
  useEffect(() => {
    initializeGame()
  }, [])

  const handleCellClick = async (coords: Coords) => {
    const newGameState = await api.makeMove(game!.id, coords)
    setGame(newGameState)
  }

  /*** View */

  if (!game) {
    return (
      <div>Loading...</div>
    )
  }

  return (
    <>
      <div className="h-screen w-screen bg-black flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="grid grid-cols-3 grid-rows-3 w-[300px] h-[300px]">
            {game.board.map((row, rowIndex) =>
              row.map((cell, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className="aspect-square border-2 border-white flex items-center justify-center text-5xl text-white cursor-pointer"
                  onClick={() => handleCellClick({ row: rowIndex, col: colIndex })}
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
    </>
  )
}

export default App

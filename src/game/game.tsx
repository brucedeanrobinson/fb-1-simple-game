
type Player = 'x' | 'o'

type Cell = Player | null

export type Board = Cell[][]

export type EndState = 'x' | 'o' | 'tie' | null

export type Game = {
  board: Board,
  currentPlayer: Player,
  endState: EndState
}

export function InitialGameState(): Game {
  return {
    board: Array.from({length: 3}, () => Array(3).fill(null)),
    currentPlayer: 'x',
    endState: null
  }
}

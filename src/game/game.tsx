// types

// game
// board
// cell
// player

// coords
type Player = 'x' | 'o'

type Cell = Player | null

type Board = Cell[][]

type EndState = ''

type Game = {
  board: Board,
  currentPlayer: Player,
  endState?: EndState
}
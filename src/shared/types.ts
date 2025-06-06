export type Player = 'x' | 'o';
export type Cell = Player | null;
export type Board = Cell[][];
export type EndState = Player | 'tie' | null;

export type Coords = {
  row: number,
  col: number
}

export type GameState = {
  id: string,
  board: Board;
  currentPlayer: Player;
  endState: EndState;
};

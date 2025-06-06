export type Player = 'x' | 'o';
export type Cell = Player | null;
export type Board = Cell[][];
export type EndState = Player | 'tie' | null;

export type Game = {
  board: Board;
  currentPlayer: Player;
  endState: EndState;
};

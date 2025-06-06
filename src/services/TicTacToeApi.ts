import type { Game, Coords } from "../shared/types";

export interface TicTacToeApi { 
  createGame(): { gameid: string; game: Game };
  getGame(gameId: string): Game | null;
  makeMove(gameId: string, coords: Coords): Game | null;
}

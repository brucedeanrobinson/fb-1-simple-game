import type { Game } from "../shared/types";

export interface TicTacToeApi { 
  createGame(): { gameid: string; game: Game };
  getGame(gameId: string): Game | null;
  makeMove(gameId: string, row: number, col: number): Game | null;
}
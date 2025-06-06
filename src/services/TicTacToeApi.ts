import type { GameState, Coords } from "../shared/types";
import { createGameState, makeMove } from "../shared/gameLogic"

export interface TicTacToeApi { 
  createGame(): { gameid: string; game: GameState };
  getGame(gameId: string): GameState | null;
  makeMove(gameId: string, coords: Coords): GameState | null;
}

export class InMemoryTicTacToeApi {
  private games: Map<string, GameState> = new Map();

  async createGame(): Promise<GameState> {
    const game = createGameState()
    this.games.set(game.id, game)
    return game
  }

  async getGame(gameId: string): Promise<GameState> {
    const game = this.games.get(gameId)
    if (!game) throw new Error("Game not found")
    return game
  }

  async makeMove(gameId: string, coords: Coords): Promise<GameState> {
    const game = await this.getGame(gameId)
    const newGame = makeMove(game, coords)
    this.games.set(gameId, newGame)
    return newGame
  }
}

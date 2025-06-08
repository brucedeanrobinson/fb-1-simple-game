import type { GameState, Coords } from "../shared/types";
import { createGame, makeMove } from "../shared/gameLogic"
import { SERVER_URL } from "../utils/constants";

export interface TicTacToeApi {
  createGame(): Promise<GameState>
  getGame(gameId: string): Promise<GameState>
  makeMove(gameId: string, coords: Coords): Promise<GameState>
}

export class InMemoryTicTacToeApi implements TicTacToeApi {
  private games: Map<string, GameState> = new Map();

  async createGame(): Promise<GameState> {
    const game = createGame()
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

export class TicTacToeApiClient implements TicTacToeApi {
  async createGame(): Promise<GameState> {
    const response = await fetch(`${SERVER_URL}/api/game`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    })
    const game = await response.json()
    return game
  }

  async getGame(gameId: string): Promise<GameState> {
    const response = await fetch(`${SERVER_URL}/api/game/${gameId}`)
    const game = await response.json()
    return game
  }

  async makeMove(gameId: string, coords: Coords): Promise<GameState> {
    const response = await fetch(`${SERVER_URL}/api/game/${gameId}/move`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(coords)
    })
    const game = await response.json()
    return game
  }
}

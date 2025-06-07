import { config } from 'dotenv';
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import { eq } from 'drizzle-orm';

import type { TicTacToeApiClient } from '../services/TicTacToeApi';
import { type Board, type EndState, type GameState, type Player } from '../shared/types';
import { createGame, makeMove } from '../shared/gameLogic';
import { games } from './schema';

config(); // Loads DATABASE_URL from .env

const client = postgres(process.env.DATABASE_URL!); // required
const db = drizzle(client); // this is correct

export class DbTicTacToeApi implements TicTacToeApiClient {
  async createGame(): Promise<GameState> {
    const game = createGame();
    await db.insert(games).values(game);
    return game;
  }

  async getGame(gameId: string): Promise<GameState> {
    const result = await db.select().from(games).where(eq(games.id, gameId));
    if (result.length === 0) throw new Error('Game not found');
    const game = result[0];
    return {
      id: game.id,
      currentPlayer: game.currentPlayer as Player,
      board: game.board as Board,
      endState: game.endState as EndState
    }
  }

  async makeMove(gameId: string, coords: { row: number; col: number }): Promise<GameState> {
    const game = await this.getGame(gameId);
    const updatedGame = makeMove(game, coords);
    await db.update(games).set(updatedGame).where(eq(games.id, gameId));
    return updatedGame;
  }
}

// src/db/schema.ts
import { pgTable, uuid, text, timestamp, integer } from "drizzle-orm/pg-core";

// === Game table ===
// One row per game
export const games = pgTable("games", {
  id: uuid("id").primaryKey().defaultRandom(),
  currentPlayer: text("current_player").notNull(), // 'x' or 'o'
  endState: text("end_state"), // 'x', 'o', 'tie', or null
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// === Moves table ===
// One row per move (max 9 per game)
export const moves = pgTable("moves", {
  id: uuid("id").primaryKey().defaultRandom(),
  gameId: uuid("game_id").notNull().references(() => games.id, { onDelete: 'cascade' }),
  row: integer("row").notNull(),
  col: integer("col").notNull(),
  player: text("player").notNull(), // 'x' or 'o'
  turnNumber: integer("turn_number").notNull(), // 1 through 9
});

// src/db/schema.ts
import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";
import { json } from "drizzle-orm/pg-core"

// === Game table ===
// One row per game
export const games = pgTable("games", {
  id: uuid("id").primaryKey().defaultRandom(),
  currentPlayer: text("current_player").notNull(), // 'x' or 'o'
  endState: text("end_state"), // 'x', 'o', 'tie', or null
  board: json("board").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

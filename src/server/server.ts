import express from "express";
import ViteExpress from "vite-express";

// API
import { TicTacToeApiClient } from "../services/TicTacToeApi";
import { PORT, SERVER_URL } from "../utils/constants";
// const api = new InMemoryTicTacToeApi()
const api = new TicTacToeApiClient()

const app = express()
app.use(express.json())

/* Routes 
ping
create a game (there's no fetch game, server creates a game and holds it until death, for now...)
get game id
make a game move
*/

app.get("/ping", (_, res): void => { res.send("Server online."); });
app.post("/api/game", async (_, res) => {
  const game = await api.createGame()
  res.json(game)
})
app.get("/api/game/:gameId", async(req, res) => {
  const game = await api.getGame(req.params.gameId)
  res.json(game)
})
app.post("/api/game/:gameId/move", async (req, res) => {
  const game = await api.makeMove(req.params.gameId, {row: req.body.row, col: req.body.col})
  res.json(game)
})

ViteExpress.listen(app, PORT, () => console.log(`Server is listening... on ${SERVER_URL}`));

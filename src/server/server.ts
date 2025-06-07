import express from "express";
import ViteExpress from "vite-express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

// API
import { DbTicTacToeApi } from "../db";
import { PORT, SERVER_URL } from "../utils/constants";
const api = new DbTicTacToeApi()

const app = express()
app.use(cors({
  origin: '*',
  credentials: true
}))

app.use(express.json())

/** ROUTES */

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
app.get("/api/games", async (_, res) => {
  try {
    const games = await api.listJoinableGames?.();
    res.json(games);
  } catch (err) {
    console.error("Failed to fetch games", err);
    res.status(500).json({ error: "Could not fetch games" });
  }
});

/** SOCKETIO */

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // change to your client URL if needed
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log(`🧠 Client connected: ${socket.id}`);

  socket.on("join-game", (gameId) => {
    socket.join(gameId);
    console.log(`🟢 ${socket.id} joined game ${gameId}`);
  });

  socket.on("make-move", ({ gameId, move }) => {
    socket.to(gameId).emit("move-made", move);
  });

  socket.on("disconnect", () => {
    console.log(`🔌 Disconnected: ${socket.id}`);
  });
});

ViteExpress.listen(app, PORT, () => console.log(`Server is listening... on ${SERVER_URL}`));

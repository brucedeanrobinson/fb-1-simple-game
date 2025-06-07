# FractalBootcamp - TicTacToe

## do the things

`nvm use 18`
`npm i`
`bun dev`

### misc setup notes

- installing ts types for express and vite-express `bun add -d @types/express @types/node vite-express`

## Features

A simple version of your game should have the following:

Game Engine

- [x] Separate game logic from React components
- [x] Track game state (board, current player, etc.)
- [x] Allow users to calculate moves
- [x] Handle move validation
- [x] Detect win/lose/draw conditions

Frontend/React Game Interface

- [x] Display current game state
- [x] Allow players to make moves by using the game engine
- [x] Show game status (whose turn, winner, etc.)
- [just refresh lol] Reset/restart game functionality

Bonus:
[Styling] - Make it look sexy. Add animations for game moves (react-spring, framer, keyframes)
[Routing] - Multiple pages with navigation: - [ ] Start/menu page with game mode selection (Player vs Player, Player vs AI) - [ ] Game page for active gameplay
[Algorithms] - Player vs AI modes: start with random moves, then implement minimax or other algorithms for calculating optimal moves

### File structure ex

src/App.tsx
server/server.js
shared/types.ts & game.ts

### Adding databases

- [x] Vite-Express
  - [x] replace bun dev script with bun run --watch server.ts, check working
- [x] Api
  - [x] `api.ts`
  - [x] `in-memory-api.ts`
  - [lol] `add tests for ^`
  - [x] add express endpoints (create, update, read)
  - [x] `api.client.ts`
  - [x] integrate `api-client` into `App.tsx`
- [x] PostgreSQL Supabase
  - [x] .env
  - connects to a test db in Supabase when running locally, not polluting prod db
- [x] Drizzle.js
  - [x] `db-api.ts`
  - [x] swap in-mem to db
  - [ ] run tests, run server, should work!
- [x] use supabase online db
- [ ] tests that pass for both the in-memory and database implementations
- [ ] aesthetics
- [ ] gracefully handles slow internet connections when connections are very slow
  - use Chrome's Network Throttling to slow down your internet connection and see how the user experience degrades
  - use useOptimistic so the UI updates even when requests are very slow

# Multi-Client Game

## Lecture Code

## Overview

Make your simple game multi-client. You should be able to play on multiple computers/browser which talk to each other. You’ll need to add a way to discover games that have only one person, manage “connection state” on the server, and sync game state between server and multiple clients.

## Core Concepts

- Algorithms
- Data Structures
- React & express
- Full-stack

## Features

Your multi-client features should build on top of your [databases](./3-databases.md) work:

- [ ] Routing
  - [ ] Navigate directly to a game
- [ ] Lobby
  - [ ] List joinable games
  - [ ] Start a new game
- [ ] Results
  - [ ] Rematch option
- [ ] Live update
  - [ ] New moves appear w/o refreshing

Bonus:

- [ ] Styling - Animations for game moves (react-spring, framer, keyframes)

## Technologies

- [react-router](https://reactrouter.com/start/data/routing) for navigation
- websockets ([socket.io](https://socket.io/docs/v4/tutorial/introduction)) for live updating

## Inspiration

- [https://playtictactoe.org/](https://playtictactoe.org/)
- [https://kevinshannon.com/connect4/](https://kevinshannon.com/connect4/)
- [https://www.gameaipro.com/](https://www.gameaipro.com/)

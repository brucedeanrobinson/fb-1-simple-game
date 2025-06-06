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
- [ ] Api
    - [x] `api.ts`
    - [ ] `in-memory-api.ts`
    - [ ] `add tests for ^`
    - [ ] add express endpoints (create, update, read)
    - [ ] `api.client.ts`
    - [ ] integrate `api-client` into `App.tsx`
- [ ] PostgreSQL Supabase
    - [ ] .env
    - connects to a test db in Supabase when running locally, not polluting prod db
- [ ] Drizzle.js
    - [ ] `db-api.ts`
    - [ ] swap in-mem to db
    - run tests, run server, should work!
- [ ] tests that pass for both the in-memory and database implementations
- [ ] aesthetics
- [ ] gracefully handles slow internet connections when connections are very slow
    - use Chrome's Network Throttling to slow down your internet connection and see how the user experience degrades
    - use useOptimistic so the UI updates even when requests are very slow

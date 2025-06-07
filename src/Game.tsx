// Game.tsx
import { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { TicTacToeApiClient } from './services/TicTacToeApi';
import type { Coords, GameState } from './shared/types';

export default function Game() {
  const { gameId } = useParams();
  const api = useMemo(() => new TicTacToeApiClient(), []);
  const [game, setGame] = useState<GameState | undefined>();

  useEffect(() => {
    if (!gameId) return;

    api.getGame(gameId)
      .then((game) => {
        console.log("Fetched game:", game);
        setGame(game);
      })
      .catch((err) => {
        console.error("Failed to load game", err);
      });
  }, [gameId]);

  const handleCellClick = async (coords: Coords) => {
    if (!gameId || !game) return;
    const newGameState = await api.makeMove(gameId, coords);
    setGame(newGameState);
  };

  if (!game) return <div>Loading...</div>;

  return (
    <div className="h-screen w-screen bg-black flex items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <div className="grid grid-cols-3 grid-rows-3 w-[300px] h-[300px]">
          {game.board.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className="aspect-square border-2 border-white flex items-center justify-center text-5xl text-white cursor-pointer"
                onClick={() => handleCellClick({ row: rowIndex, col: colIndex })}
              >
                {cell}
              </div>
            ))
          )}
        </div>
        <div className="text-white text-xl h-6">
          {game.endState === 'x' || game.endState === 'o'
            ? `Player ${game.endState} wins!`
            : game.endState === 'tie'
              ? 'Tie game!'
              : <span className="invisible">Game in progress...</span>}
        </div>
      </div>
    </div>
  );
}

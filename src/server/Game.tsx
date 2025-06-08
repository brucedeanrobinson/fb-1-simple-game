// Game.tsx
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import type { Coords, GameState } from '../shared/types';
import socket from '../socket';
import { SERVER_URL } from '../utils/constants';

export default function Game() {
  const { gameId } = useParams();
  const [game, setGame] = useState<GameState | undefined>();

  useEffect(() => {
    if (!gameId) return;

    // Join the socket room for this game
    socket.emit('join-game', gameId);

    // Receive live game state updates
    socket.on('game-updated', (newGame: GameState) => {
      console.log('Received updated game', newGame);
      setGame(newGame);
    });

    // Initial fetch
    fetch(`${SERVER_URL}/api/game/${gameId}`)
      .then((res) => res.json())
      .then(setGame)
      .catch(() => setGame(undefined));

    // Clean up
    return () => {
      socket.emit('leave-game', gameId);
      socket.removeAllListeners('game-updated');
    };
  }, [gameId]);

  const handleCellClick = (coords: Coords) => {
    if (!gameId || !game) return;
    console.log('Clicking cell:', coords);
    socket.emit('make-move', { gameId, coords });
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

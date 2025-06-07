import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { GameState } from '../shared/types';
import socket from '../socket';

export default function Lobby() {
  const [games, setGames] = useState<GameState[]>([]);
  const navigate = useNavigate();

  // Fetch games on mount
  useEffect(() => {
    // Join the lobby room
    socket.emit('join-lobby');

    // Handle live updates of new games
    socket.on('new-game', (game: GameState) => {
      setGames((prevGames) => [...prevGames, game]);
    });

    // Fetch existing games
    fetch("/api/games")
      .then((res) => res.json())
      .then(setGames)
      .catch((err) => console.error("Failed to load games", err));

    return () => {
      socket.emit('leave-lobby');
      socket.off('new-game');
    };
  }, []);

  // Start new game and redirect
  const startNewGame = async () => {
    const res = await fetch("/api/game", { method: "POST" });
    const newGame = await res.json();

    socket.emit('game-created', newGame);

    navigate(`/game/${newGame.id}`);
  };

  return (
    <div className="p-4 text-white">
      <h1 className="text-2xl mb-4">Lobby</h1>

      <button
        onClick={startNewGame}
        className="bg-green-600 px-4 py-2 rounded mb-4"
      >
        Start New Game
      </button>

      <ul className="space-y-2">
        {games.length === 0 ? (
          <p>No games yet. Start one!</p>
        ) : (
          games.map((game) => (
            <li
              key={game.id}
              className="flex justify-between border border-white p-2 rounded"
            >
              <span>Game ID: {game.id.slice(0, 8)}...</span>
              <button
                className="bg-blue-600 px-3 py-1 rounded"
                onClick={() => navigate(`/game/${game.id}`)}
              >
                Join
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

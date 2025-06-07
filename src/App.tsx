// App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Game from './server/Game';
import Lobby from './server/Lobby';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Lobby />} />
        <Route path="/game/:gameId" element={<Game />} />
      </Routes>
    </BrowserRouter>
  );
}

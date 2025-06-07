// App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Game from './Game';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/game/:gameId" element={<Game />} />
      </Routes>
    </BrowserRouter>
  );
}

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Leagues from './pages/Leagues';
import Header from './components/Header';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/leagues" replace />} />
        <Route path="/leagues" element={<Leagues />} />
        <Route path="/leagues/:id" element={<div>Календарь лиги (скоро)</div>} />
        <Route path="/teams" element={<div>Команды (скоро)</div>} />
        <Route path="/teams/:id" element={<div>Календарь команды (скоро)</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
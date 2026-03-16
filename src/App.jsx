import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Leagues from './pages/Leagues';
import Teams from './pages/Teams';
import LeagueCalendar from './pages/LeagueCalendar';
import TeamCalendar from './pages/TeamCalendar';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/leagues" replace />} />
        <Route path="/leagues" element={<Leagues />} />
        <Route path="/leagues/:id" element={<LeagueCalendar />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/teams/:id" element={<TeamCalendar />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
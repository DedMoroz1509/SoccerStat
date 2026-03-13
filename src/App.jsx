import { useEffect } from 'react';
import { getCompetitions } from './services/api';

function App() {
  useEffect(() => {
    const loadCompetitions = async () => {
      try {
        const data = await getCompetitions();
        console.log('Лиги:', data);
      } catch (error) {
        console.error('Не удалось загрузить лиги', error.message);
      }
    };
    
    loadCompetitions();
  }, []);

  return (
    <div>
      <h1>SoccerStat</h1>
    </div>
  );
}

export default App;
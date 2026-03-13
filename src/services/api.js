const BASE_URL = '/api';

export const getCompetitions = async () => {
    try {
      const response = await fetch(`${BASE_URL}/competitions`, {
        headers: {
          'X-Auth-Token': import.meta.env.VITE_FOOTBALL_DATA_API_KEY
        }
      });
      
      if (!response.ok) {
        throw new Error(`Ошибка: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Ошибка при загрузке лиг:', error);
      throw error;
    }
  };
const BASE_URL = '/api';
const HEADERS = {
  'X-Auth-Token': import.meta.env.VITE_FOOTBALL_DATA_API_KEY
};

const fetchData = async (endpoint) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      headers: HEADERS
    });
     
    if (response.status === 429) {
      throw new Error('Слишком много запросов. Подождите минуту.');
    }
    
    if (!response.ok) {
      throw new Error(`Ошибка: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Ошибка при загрузке ${endpoint}:`, error);
    throw error;
  }
};

export const getCompetitions = () => fetchData('/competitions');
export const getTeams = () => fetchData('/teams');
export const getLeagueMatches = (leagueId) => fetchData(`/competitions/${leagueId}/matches`);
export const getTeamMatches = (teamId) => fetchData(`/teams/${teamId}/matches`);
import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { getTeams } from '../services/api';
import TeamCard from '../components/TeamCard';
import Search from '../components/Search';
import AlertMessage from '../components/AlertMessage';
import Footer from '../components/Footer';
import '../assets/leagues-page.css';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 16; 

  useEffect(() => {
    const loadTeams = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getTeams();
        setTeams(data.teams || []);
      } catch (err) {
        setError(err.message || 'Не удалось загрузить список команд');
      } finally {
        setLoading(false);
      }
    };
    loadTeams();
  }, []);

  const filteredTeams = teams.filter(team => {
    const name = team.name?.toLowerCase() || '';
    const country = team.area?.name?.toLowerCase() || '';
    const query = searchQuery.toLowerCase();
    return name.includes(query) || country.includes(query);
  });

  const totalPages = Math.ceil(filteredTeams.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTeams = filteredTeams.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <div className="leagues-page"> 
      <Container className="leagues-container">
        <div className="d-flex justify-content-center mb-4">
          <div className="search-wrapper">
            <Search 
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        {error && <AlertMessage message={error} />}
        
        {loading ? (
          <div className="loading-spinner">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Загрузка...</span>
            </div>
            <p className="loading-text">Загрузка команд...</p>
          </div>
        ) : (
          <>
            {!error && filteredTeams.length === 0 ? (
              <AlertMessage 
                variant="info" 
                message="Ничего не найдено" 
              />
            ) : (
              <>
                <div className="cards-container">
                  {currentTeams.map(team => (
                    <div key={team.id} className="card-wrapper">
                      <TeamCard team={team} />
                    </div>
                  ))}
                </div>

                {filteredTeams.length > 0 && (
                  <Footer
                    showPagination={true}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                )}
              </>
            )}
          </>
        )}
      </Container>
    </div>
  );
}

export default Teams;
import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { getCompetitions } from '../services/api';
import LeagueCard from '../components/LeagueCard';
import Search from '../components/Search';
import AlertMessage from '../components/AlertMessage';
import Footer from '../components/Footer';
import '../assets/leagues-page.css';
import '../assets/index.css';

function Leagues() {
  const [leagues, setLeagues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 16; 

  useEffect(() => {
    const loadLeagues = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getCompetitions();
        setLeagues(data.competitions || []);
      } catch (err) {
        setError(err.message || 'Не удалось загрузить список лиг');
      } finally {
        setLoading(false);
      }
    };
    loadLeagues();
  }, []);

  const filteredLeagues = leagues.filter(league => {
    const name = league.name?.toLowerCase() || '';
    const country = league.area?.name?.toLowerCase() || '';
    const query = searchQuery.toLowerCase();
    return name.includes(query) || country.includes(query);
  });

  const totalPages = Math.ceil(filteredLeagues.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentLeagues = filteredLeagues.slice(startIndex, endIndex);

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
            <p className="loading-text">Загрузка лиг...</p>
          </div>
        ) : (
          <>
            {!error && filteredLeagues.length === 0 ? (
              <AlertMessage 
                variant="info" 
                message="Ничего не найдено" 
              />
            ) : (
              <>
                <div className="cards-container">
                  {currentLeagues.map(league => (
                    <div key={league.id} className="card-wrapper">
                      <LeagueCard league={league} />
                    </div>
                  ))}
                </div>

                {filteredLeagues.length > 0 && (
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

export default Leagues;
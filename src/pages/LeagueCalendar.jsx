import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { getLeagueById, getLeagueMatches } from '../services/api';
import Breadcrumbs from '../components/Breadcrumbs';
import DateFilter from '../components/DateFilter';
import MatchCard from '../components/MatchCard';
import AlertMessage from '../components/AlertMessage';
import Footer from '../components/Footer';

function LeagueCalendar() {
  const { id } = useParams();
  const [leagueName, setLeagueName] = useState('');
  const [allMatches, setAllMatches] = useState([]); 
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const loadLeagueName = async () => {
      try {
        const data = await getLeagueById(id);
        setLeagueName(data.name || data.competition?.name);
      } catch (err) {
        console.error('Ошибка загрузки названия лиги:', err);
      }
    };
    loadLeagueName();
  }, [id]); 

  const loadMatches = useCallback(async (dateFrom = null, dateTo = null) => {
    try {
      setLoading(true);
      setError(null);
      const data = await getLeagueMatches(id, dateFrom, dateTo);
      setAllMatches(data.matches || []);
      setCurrentPage(1); 
    } catch (err) {
      console.error('Ошибка загрузки матчей:', err);
      setError(err.message || 'Не удалось загрузить матчи');
      setAllMatches([]);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setMatches(allMatches.slice(startIndex, endIndex));
  }, [allMatches, currentPage]);

  useEffect(() => {
    if (isFirstLoad) {
      loadMatches();
      setIsFirstLoad(false);
    }
  }, [isFirstLoad, loadMatches]);

  const handleFilter = useCallback((dateFrom, dateTo) => {
    loadMatches(dateFrom, dateTo);
  }, [loadMatches]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const totalPages = Math.ceil(allMatches.length / itemsPerPage);

  const breadcrumbsItems = [
    { label: 'Лиги', path: '/leagues' },
    { label: leagueName || 'Загрузка...', path: '' }
  ];

  return (
    <div className="leagues-page">
      <Container className="leagues-container">
        <Breadcrumbs items={breadcrumbsItems} />
        
        <DateFilter onFilter={handleFilter} />
        
        {error && <AlertMessage message={error} />}
        
        {loading ? (
          <div className="loading-spinner">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Загрузка...</span>
            </div>
            <p className="loading-text">Загрузка матчей...</p>
          </div>
        ) : (
          <>
            {matches.length === 0 && !error ? (
              <AlertMessage 
                variant="info" 
                message="Нет матчей за выбранный период" 
              />
            ) : (
              <>
                <div className="matches-list">
                  {matches.map(match => (
                    <MatchCard key={match.id} match={match} />
                  ))}
                </div>

                {totalPages > 1 && (
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

export default LeagueCalendar;
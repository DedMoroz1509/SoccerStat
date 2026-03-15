import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function LeagueCard({ league }) {
  const navigate = useNavigate();
  
  const crestUrl = league.emblem;
  const handleClick = () => {
    navigate(`/leagues/${league.id}`);
  };
  
  return (
    <Card 
      className="league-card"
      onClick={handleClick}
    >
      <Card.Body className="league-card-body">
        <div className="league-card-logo-wrapper">
          <img 
            src={crestUrl} 
            alt={league.name}
            className="league-card-logo"
            onError={(e) => {
              e.target.onerror = null;
            }}
          />
        </div>
        
        <div className="league-card-footer">
          <Card.Title className="league-card-title">{league.name}</Card.Title>
          <Card.Text className="league-card-country">
            {league.area?.name || 'Неизвестная страна'}
          </Card.Text>
        </div>
      </Card.Body>
    </Card>
  );
}

export default LeagueCard;
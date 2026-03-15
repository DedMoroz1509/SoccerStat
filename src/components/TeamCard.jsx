import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function TeamCard({ team }) {
  const navigate = useNavigate();
  const crestUrl = team.crest;

  const handleClick = () => {
    navigate(`/teams/${team.id}`);
  };
  
  return (
    <Card 
      className="team-card"
      onClick={handleClick}
    >
      <Card.Body className="team-card-body">
        <div className="team-card-logo-wrapper">
          <img 
            src={crestUrl} 
            alt={team.name}
            className="team-card-logo"
            onError={(e) => {
              e.target.onerror = null;
            }}
          />
        </div>
        
        <div className="team-card-footer">
          <Card.Title className="team-card-title">{team.name}</Card.Title>
        </div>
      </Card.Body>
    </Card>
  );
}

export default TeamCard;
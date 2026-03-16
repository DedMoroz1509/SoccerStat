import { Card } from 'react-bootstrap';
import { formatDate, formatTime } from '../utils/dateUtils';
import { formatScore, formatStatus } from '../utils/scoreUtils';

function MatchCard({ match }) {
  return (
    <Card className="match-card">
      <Card.Body className="match-card-body p-2">
        <div className="match-datetime-row">
          <span className="match-date">{formatDate(match.utcDate)}</span>
          <span className="match-time">{formatTime(match.utcDate)}</span>
        </div>
        
        <div className="match-status">
          {formatStatus(match.status)}
        </div>
        
        <div className="match-teams">
          <span className="team-name">{match.homeTeam?.name}</span>
          <span className="team-separator">—</span>
          <span className="team-name">{match.awayTeam?.name}</span>
        </div>
        
        <div className="match-score">
          {formatScore(match.score)}
        </div>
      </Card.Body>
    </Card>
  );
}

export default MatchCard;
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';

function Breadcrumbs({ items }) {
  return (
    <Container className="breadcrumbs-container">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            
            return isLast ? (
              <li key={index} className="breadcrumb-item active" aria-current="page">
                {item.label}
              </li>
            ) : (
              <li key={index} className="breadcrumb-item">
                <Link to={item.path}>{item.label}</Link>
              </li>
            );
          })}
        </ol>
      </nav>
    </Container>
  );
}

export default Breadcrumbs;
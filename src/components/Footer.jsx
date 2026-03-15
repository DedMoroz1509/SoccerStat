import { Container } from 'react-bootstrap';
import Pagination from './Pagination';

function Footer({ 
  showPagination = false,
  currentPage = 1,
  totalPages = 1,
  onPageChange = () => {}
}) {
  return (
    <footer className="py-4 mt-4">
      <Container>
        {showPagination && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        )}
      </Container>
    </footer>
  );
}

export default Footer;
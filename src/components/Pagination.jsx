import { Pagination as BsPagination } from 'react-bootstrap';

function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(
      <BsPagination.Item
        key={i}
        active={i === currentPage}
        onClick={() => onPageChange(i)}
      >
        {i}
      </BsPagination.Item>
    );
  }

  return (
    <div className="d-flex justify-content-center mt-4">
      <BsPagination>
        <BsPagination.Prev
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        />
        {pages}
        <BsPagination.Next
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        />
      </BsPagination>
    </div>
  );
}

export default Pagination;
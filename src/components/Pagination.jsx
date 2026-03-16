import { Pagination as BsPagination } from 'react-bootstrap';

function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const renderPages = () => {
    const pages = [];
    const visiblePages = 6;

    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, start + visiblePages - 1);

    if (end === totalPages) {
      start = Math.max(1, totalPages - visiblePages + 1);
    }

    if (start === 1) {
      end = Math.min(totalPages, visiblePages);
    }

    for (let i = start; i <= end; i++) {
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

    return pages;
  };

  const showEllipsis = totalPages > 6 && currentPage < totalPages - 2;

  return (
    <div className="pagination-wrapper d-flex justify-content-center">
      <BsPagination>
        <BsPagination.Prev
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        />
        
        {renderPages()}
        
        {showEllipsis && <BsPagination.Ellipsis disabled />}
        
        <BsPagination.Next
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        />
      </BsPagination>
    </div>
  );
}

export default Pagination;
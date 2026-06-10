import { Pagination as BsPagination } from 'react-bootstrap'

function Pagination({ currentPage, totalPages, onPageChange, totalRecords, pageSize = 5 }) {
  if (totalPages <= 1) return null

  const recordFrom = (currentPage - 1) * pageSize + 1
  const recordTo = Math.min(currentPage * pageSize, totalRecords)

  return (
    <div className="d-flex justify-content-between align-items-center mt-3">
      <span className="text-muted small">
        Show {recordFrom}–{recordTo} of {totalRecords} records
      </span>

      <BsPagination className="mb-0">
        <BsPagination.Prev
          title="Previous"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        />

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <BsPagination.Item
            key={page}
            active={page === currentPage}
            onClick={() => onPageChange(page)}
          >
            {page}
          </BsPagination.Item>
        ))}

        <BsPagination.Next
          title="Next"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        />
      </BsPagination>
    </div>
  )
}

export default Pagination

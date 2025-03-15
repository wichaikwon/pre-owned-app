import { ChevronLeft, ChevronRight } from 'lucide-react'
import React from 'react'

interface PaginationProps {
  currentPage: number
  totalItems: number
  itemsPerPage: number
  onPageChange: (page: number) => void
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalItems, itemsPerPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  return (
    <div className="flex justify-center space-x-2 p-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="rounded-md bg-gray-400 px-4 py-2 text-white disabled:bg-gray-200">
        <ChevronLeft />
      </button>
      <span className="flex items-center px-4">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="rounded-md bg-gray-400 px-4 py-2 text-white disabled:bg-gray-200">
        <ChevronRight />
      </button>
    </div>
  )
}

export default Pagination

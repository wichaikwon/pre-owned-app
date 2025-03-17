import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'
import React from 'react'

interface PaginationProps {
  currentPage: number
  totalItems: number
  itemsPerPage: number
  onPageChange: (page: number) => void
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalItems, itemsPerPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const groupSize = 10
  const currentGroup = Math.floor((currentPage - 1) / groupSize)
  const startPage = currentGroup * groupSize + 1
  const endPage = Math.min(startPage + groupSize - 1, totalPages)
  const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i)

  return (
    <div className="flex justify-center space-x-2 p-4">
      {[
      { onClick: () => onPageChange(1), disabled: currentPage === 1, icon: <ChevronsLeft /> },
      { onClick: () => onPageChange(currentPage - 1), disabled: currentPage === 1, icon: <ChevronLeft /> },
      ].map((btn, i) => (
      <button
        key={i}
        onClick={btn.onClick}
        disabled={btn.disabled}
        className="w-10 h-10 flex items-center justify-center rounded-md bg-gray-400 text-white disabled:bg-gray-200">
        {btn.icon}
      </button>
      ))}
      {currentGroup > 0 && (
      <button
        onClick={() => onPageChange(startPage - groupSize)}
        className="w-10 h-10 flex items-center justify-center rounded-md bg-gray-400 text-white">
        {startPage - groupSize}...
      </button>
      )}
      {pageNumbers.map((page) => (
      <button
        key={page}
        onClick={() => onPageChange(page)}
        className={`w-10 h-10 flex items-center justify-center rounded-md ${
        page === currentPage ? 'bg-red-600 text-white' : 'bg-gray-400 text-white'
        }`}>
        {page}
      </button>
      ))}
      {endPage < totalPages && (
      <button
        onClick={() => onPageChange(endPage + 1)}
        className="w-10 h-10 flex items-center justify-center rounded-md bg-gray-400 text-white">
        ...{endPage + groupSize}
      </button>
      )}
      {[
      { onClick: () => onPageChange(currentPage + 1), disabled: currentPage === totalPages, icon: <ChevronRight /> },
      { onClick: () => onPageChange(totalPages), disabled: currentPage === totalPages, icon: <ChevronsRight /> },
      ].map((btn, i) => (
      <button
        key={i}
        onClick={btn.onClick}
        disabled={btn.disabled}
        className="w-10 h-10 flex items-center justify-center rounded-md bg-gray-400 text-white disabled:bg-gray-200">
        {btn.icon}
      </button>
      ))}
    </div>
  )
}

export default Pagination

import React, { JSX } from 'react'

interface TableProps<T> {
  headers: string[]
  data: T[]
  renderRow: (item: T, idx: number) => React.ReactNode
  title?: string
  onCreate?: () => void
  search?: string
  onSearchChange?: (value: string) => void
}

const Table = <T,>({
  headers,
  data,
  renderRow,
  title,
  onCreate,
  search = '',
  onSearchChange,
}: TableProps<T>): JSX.Element => {
  return (
    <>
      <div className="flex items-center justify-between py-2">
        {title && <h1>{title}</h1>}
        {onCreate && (
          <button
            onClick={onCreate}
            className="flex items-center justify-center rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600">
            Create
          </button>
        )}
      </div>
      <div className="flex w-full flex-col items-center justify-center gap-2">
        {onSearchChange && (
          <input
            className="w-full max-w-2xl rounded-md border p-2"
            placeholder="Search..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        )}
        <div className="container mx-auto">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 whitespace-nowrap">
              <thead>
                <tr className="bg-gray-100">
                  {headers.map((header, idx) => (
                    <th key={idx} className="border border-gray-300 px-4 py-2 text-center">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((item, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    {renderRow(item, idx)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default Table

import React from 'react'

interface TableProps<T> {
  headers: string[]
  data: T[]
  renderRow: (item: T, index: number) => React.ReactNode
}

const Table = <T,>({ headers, data, renderRow }: TableProps<T>) => {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
        <thead className="bg-gray-500 text-xs text-white uppercase">
          <tr>
            {headers.map((header, idx) => (
              <th key={idx} className="px-6 py-3">
                <div className="flex items-center justify-center">
                  {header}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, idx) => (
            <tr key={idx} className="border-b border-gray-200 bg-white text-black hover:bg-gray-200">
              {renderRow(item, idx)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Table
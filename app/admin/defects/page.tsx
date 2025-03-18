'use client'
import Pagination from '@/hooks/pagination'
import { fetchDefects } from '@/lib/defects/getDefect'
import { PenSquare, SquarePen, Trash2 } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import React, { use, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

type Defect = {
  id: string
  defectCode: string
  description: string
}
const Defects: React.FC = () => {
  const router = useRouter()
  const pathname = usePathname()
  const { handleSubmit } = useForm()
  const [defects, setDefects] = useState<Defect[]>([])
  const [search, setSearch] = useState('')
  const [isModal, setIsModal] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const defectsPerPage = 10
  const filteredDefects = defects.filter(
    (defect) =>
      defect.description.toLowerCase().includes(search.toLowerCase()) ||
      defect.defectCode.toLowerCase().includes(search.toLowerCase())
  )
  const indexOfLastDefect = currentPage * defectsPerPage
  const indexOfFirstDefect = indexOfLastDefect - defectsPerPage
  const currentDefects = filteredDefects.slice(indexOfFirstDefect, indexOfLastDefect)
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }
  useEffect(() => {
    fetchDefects().then(setDefects)
  }, [])

  const handleDelete = (id: string) => {
    // deleteDefect(id).then(() => fetchDefects().then(setDefects))
  }

  return (
    <div className="flex flex-col gap-2 px-10">
      <div className="flex items-center justify-between py-2">
        <h1>Defects</h1>
        <button className="flex items-center justify-center rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600">
          Create
        </button>
      </div>
      <div className="flex w-full flex-col items-center justify-center gap-2">
        <input
          className="w-8/12 rounded-md border p-2"
          placeholder="Search phones..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="w-8/12 overflow-x-auto rounded-md shadow-lg">
          <table className="border-collapse border border-gray-300 whitespace-nowrap w-full">
            <thead>
              <tr className="bg-gray-100">
                {[
                  'Defect Code',
                  'Defect Name',
                  'Actions',
                ].map((header, idx) => (
                  <th key={idx} className="border border-gray-300 px-4 py-2 text-center">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentDefects.map((defect, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 text-center">{defect.defectCode}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{defect.description}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => router.push(`${pathname}/edit/${defect.id}`)}
                        className="flex items-center justify-center rounded-md bg-yellow-500 px-3 py-2 text-white hover:bg-yellow-600">
                        <PenSquare size={16} />
                      </button>
                      <form onSubmit={handleSubmit(() => handleDelete(defect.id))}>
                        <button
                          type="submit"
                          className="flex shrink-0 items-center justify-center rounded-md bg-red-500 px-3 py-2 text-white hover:bg-red-600">
                          <Trash2 size={16} />
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination
          currentPage={currentPage}
          totalItems={filteredDefects.length}
          itemsPerPage={defectsPerPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  )
}

export default Defects

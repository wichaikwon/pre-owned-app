'use client'
import Pagination from '@/hooks/pagination'
import { fetchDefects } from '@/lib/defects/getDefect'
import { PenSquare, Trash2 } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Table from '@/app/components/admin/table/Table'

type Defect = {
  id: string
  defectCode: string
  defectName: string
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
      defect.defectName?.toLowerCase().includes(search.toLowerCase()) ||
      defect.defectCode?.toLowerCase().includes(search.toLowerCase())
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
    console.log(`Delete defect with id: ${id}`)
    // deleteDefect(id).then(() => fetchDefects().then(setDefects))
  }

  return (
    <div className="hidden px-4 md:block md:px-8">
      <div className="flex flex-col">
        <div className="flex items-center justify-between py-4">
          <span className="flex-1 text-2xl">Defects</span>
          <input
            className="flex flex-1 rounded-md border p-2"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          <div className="flex flex-1 justify-end">
            <button
              onClick={() => setIsModal(true)}
              className="rounded-md bg-green-500 p-2 text-white hover:bg-green-600">
              Create
            </button>
          </div>
        </div>
        <Table
          headers={['Defect Code', 'Defect Name', 'Actions']}
          data={currentDefects}
          renderRow={(defect: Defect) => (
            <>
              <td className="border border-gray-300 px-4 py-2 text-center">{defect.defectCode}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">{defect.defectName}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                <div className="flex items-center justify-center gap-2 text-white">
                  <button
                    onClick={() => router.push(`${pathname}/edit/${defect.id}`)}
                    className="rounded-md bg-yellow-400 p-2 hover:bg-yellow-500">
                    <PenSquare size={16} />
                  </button>
                  <form onSubmit={handleSubmit(() => handleDelete(defect.id))}>
                    <button type="submit" className="rounded-md bg-red-400 p-2 hover:bg-red-500">
                      <Trash2 size={16} />
                    </button>
                  </form>
                </div>
              </td>
            </>
          )}
        />
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

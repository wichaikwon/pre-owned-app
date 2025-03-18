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
    console.log(`Delete defect with id: ${id}`)
    // deleteDefect(id).then(() => fetchDefects().then(setDefects))
  }

  return (
    <div className="flex flex-col px-4 md:px-8">
      <Table
        title="Defects"
        headers={['Defect Code', 'Defect Name', 'Actions']}
        data={currentDefects}
        search={search}
        onSearchChange={setSearch}
        onCreate={() => setIsModal(true)}
        renderRow={(defect: Defect) => (
          <>
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
          </>
        )}
      />
      <Pagination
        currentPage={currentPage}
        totalItems={filteredDefects.length}
        itemsPerPage={defectsPerPage}
        onPageChange={handlePageChange}
      />
      {/* Add Modal component here if needed */}
    </div>
  )
}

export default Defects
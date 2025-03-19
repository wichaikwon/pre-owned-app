'use client'
import Pagination from '@/hooks/pagination'
import { fetchDefectChoices } from '@/lib/defectChoices/getDefectChoices'
import { fetchDefects } from '@/lib/defects/getDefect'
import { PenSquare, Trash2 } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Table from '@/app/components/admin/table/Table'

type DefectChoice = {
  id: string
  defectId: string
  defectCode: string
  defectName: string
  choiceCode: string
  choiceName: string
}

const DefectChoices: React.FC = () => {
  const pathname = usePathname()
  const { handleSubmit } = useForm()
  const router = useRouter()
  const [defectChoices, setDefectChoices] = useState<DefectChoice[]>([])
  const [search, setSearch] = useState('')
  const [isModal, setIsModal] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const defectChoicesPerPage = 10

  const filteredDefectChoices = defectChoices.filter(
    (defectChoice) =>
      defectChoice.defectCode.toLowerCase().includes(search.toLowerCase()) ||
      defectChoice.defectName.toLowerCase().includes(search.toLowerCase()) ||
      defectChoice.choiceCode.toLowerCase().includes(search.toLowerCase()) ||
      defectChoice.choiceName.toLowerCase().includes(search.toLowerCase())
  )

  const indexOfLastDefectChoice = currentPage * defectChoicesPerPage
  const indexOfFirstDefectChoice = indexOfLastDefectChoice - defectChoicesPerPage
  const currentDefectChoices = filteredDefectChoices.slice(indexOfFirstDefectChoice, indexOfLastDefectChoice)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  useEffect(() => {
    fetchDefectChoices().then((defectChoice) => {
      fetchDefects().then((defect: { id: string; defectCode: string; defectName: string }[]) => {
        setDefectChoices(
          defectChoice.map((defectChoice: DefectChoice) => {
            const defectData = defect.find((d) => d.id === defectChoice.defectId)
            return {
              ...defectChoice,
              defectCode: defectData?.defectCode,
              defectName: defectData?.defectName,
            }
          })
        )
      })
    })
  }, [])

  const handleDelete = (id: string) => {
    console.log(`Delete defect choice with id: ${id}`)
    // deleteDefectChoice(id).then(() => fetchDefectChoices().then(setDefectChoices))
  }

  return (
    <div className="flex flex-col px-4 md:px-8">
      <Table
        title="Defect Choices"
        headers={['Defect Code', 'Defect Name', 'Defect Choice Code', 'Defect Choice Name', 'Actions']}
        data={currentDefectChoices}
        search={search}
        onSearchChange={setSearch}
        onCreate={() => setIsModal(true)}
        renderRow={(defectChoice: DefectChoice) => (
          <>
            <td className="border border-gray-300 px-4 py-2 text-center">{defectChoice.defectCode}</td>
            <td className="border border-gray-300 px-4 py-2 text-center">{defectChoice.defectName}</td>
            <td className="border border-gray-300 px-4 py-2 text-center">{defectChoice.choiceCode}</td>
            <td className="border border-gray-300 px-4 py-2 text-center">{defectChoice.choiceName}</td>
            <td className="border border-gray-300 px-4 py-2 text-center">
              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={() => router.push(`${pathname}/edit/${defectChoice.id}`)}
                  className="flex items-center justify-center rounded-md bg-yellow-500 px-3 py-2 text-white hover:bg-yellow-600">
                  <PenSquare size={16} />
                </button>
                <form onSubmit={handleSubmit(() => handleDelete(defectChoice.id))}>
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
        totalItems={filteredDefectChoices.length}
        itemsPerPage={defectChoicesPerPage}
        onPageChange={handlePageChange}
      />
      {/* <Modal isOpen={isModal} onClose={() => setIsModal(false)} onSubmit={handleCreate} /> */}
    </div>
  )
}

export default DefectChoices

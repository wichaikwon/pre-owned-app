'use client'
import Pagination from '@/hooks/pagination'
import { fetchDefectChoices } from '@/lib/defect-choices/getDefectChoices'
import { fetchDefect, fetchDefects } from '@/lib/defects/getDefect'
import { PenSquare, Trash2 } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

type DefectChoice = {
  id: string
  defectId: string
  defectCode: string
  description: string
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
      defectChoice.description.toLowerCase().includes(search.toLowerCase()) ||
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
      fetchDefects().then((defect: { id: string; defectCode: string; description: string }[]) => {
        setDefectChoices(
          defectChoice.map((defectChoice: DefectChoice) => {
            const defectData = defect.find((d) => d.id === defectChoice.defectId)
            return {
              ...defectChoice,
              defectCode: defectData?.defectCode,
              description: defectData?.description,
            }
          })
        )
      })
    })
  }, [])

  const handleDelete = (id: string) => {
    // deleteDefectChoice(id).then(() => fetchDefectChoices().then(setDefectChoices))
  }
  return (
    <div className="flex flex-col gap-2 px-10">
      <div className="flex items-center justify-between py-2">
        <h1>Model</h1>
        <button
          onClick={() => setIsModal(true)}
          className="flex items-center justify-center rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600">
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
          <table className="w-full border-collapse border border-gray-300 whitespace-nowrap">
            <thead>
              <tr className="bg-gray-100">
                {['Defect Code', 'Defect Name', 'Defect Choice Code', 'Defect Choice Name', 'Actions'].map(
                  (header, idx) => (
                    <th key={idx} className="border border-gray-300 px-4 py-2 text-center">
                      {header}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {currentDefectChoices.map((defectChoice, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 text-center">{defectChoice.defectCode}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{defectChoice.description}</td>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination
          currentPage={currentPage}
          totalItems={filteredDefectChoices.length}
          itemsPerPage={defectChoicesPerPage}
          onPageChange={handlePageChange}
        />
      </div>
      {/* <Modal isOpen={isModal} onClose={() => setIsModal(false)} onSubmit={handleCreate} /> */}
    </div>
  )
}

export default DefectChoices

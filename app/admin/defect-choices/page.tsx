'use client'
import Pagination from '@/hooks/pagination'
import { fetchDefectChoices } from '@/lib/defectChoices/getDefectChoices'
import { fetchDefects } from '@/lib/defects/getDefect'
import { PenSquare, Trash2 } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Table from '@/app/components/admin/table/Table'
import { createDefectChoices } from '@/lib/defectChoices/createDefectChoices'
import DefectChoiceModal from '@/app/components/admin/modal/DefectChoiceModal'
import { deleteDefectChoices } from '@/lib/defectChoices/deleteDefectChoices'

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
      defectChoice.defectCode?.toLowerCase().includes(search.toLowerCase()) ||
      defectChoice.defectName?.toLowerCase().includes(search.toLowerCase()) ||
      defectChoice.choiceCode?.toLowerCase().includes(search.toLowerCase()) ||
      defectChoice.choiceName?.toLowerCase().includes(search.toLowerCase())
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

  const handleData = () => {
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
  }
  const handleDelete = (id: string) => {
    deleteDefectChoices(id).then(() => fetchDefectChoices().then(setDefectChoices))
  }

  const handleCreate = async (
    brandId: string,
    modelCode: string,
    modelName: string
  ): Promise<{ success: boolean; error?: string }> => {
    const result = await createDefectChoices(brandId, modelCode, modelName)
    if (result?.success) {
      console.log('Defect created:', result.data)
      fetchDefectChoices().then(setDefectChoices)
      return { success: true }
    } else if (result) {
      console.error('Error:', result.error)
      return { success: false, error: result.error }
    }
    return { success: false, error: 'Unexpected error occurred' }
  }

  return (
    <div className="hidden px-4 md:block md:px-8">
      <div className="flex flex-col">
        <div className="flex items-center justify-between py-4">
          <span className="flex-1 text-2xl">Defect Choices</span>
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
          headers={['Defect Code', 'Defect Name', 'Defect Choice Code', 'Defect Choice Name', 'Actions']}
          data={currentDefectChoices}
          renderRow={(defectChoice: DefectChoice) => (
            <>
              <td className="border border-gray-300 px-4 py-2 text-center">{defectChoice.defectCode}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">{defectChoice.defectName}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">{defectChoice.choiceCode}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">{defectChoice.choiceName}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                <div className="flex items-center justify-center gap-2 text-white">
                  <button
                    onClick={() => router.push(`${pathname}/edit/${defectChoice.id}`)}
                    className="rounded-md bg-yellow-400 p-2 hover:bg-yellow-500">
                    <PenSquare size={16} />
                  </button>
                  <form
                    onSubmit={handleSubmit(() => {
                      handleDelete(defectChoice.id)
                      handleData()
                    })}>
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
          totalItems={filteredDefectChoices.length}
          itemsPerPage={defectChoicesPerPage}
          onPageChange={handlePageChange}
        />
        <DefectChoiceModal isOpen={isModal} onClose={() => setIsModal(false)} onSubmit={handleCreate} />
      </div>
    </div>
  )
}

export default DefectChoices

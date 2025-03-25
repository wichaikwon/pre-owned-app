'use client'

import Modal from '@/app/components/admin/modal/ModelModal'
import Pagination from '@/hooks/pagination'
import { createModel } from '@/lib/models/createModel'
import { deleteModel } from '@/lib/models/deleteModel'
import { fetchModels } from '@/lib/models/getModel'
import { PenSquare, Trash2 } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Table from '@/app/components/admin/table/Table'

type Model = {
  id: string
  brandId: string
  modelCode: string
  modelName: string
}

const Models: React.FC = () => {
  const pathname = usePathname()
  const { handleSubmit } = useForm()
  const router = useRouter()
  const [models, setModels] = useState<Model[]>([])
  const [search, setSearch] = useState('')
  const [isModal, setIsModal] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const modelsPerPage = 10

  const filteredModels = models.filter(
    (model) =>
      model.modelName.toLowerCase().includes(search.toLowerCase()) ||
      model.modelCode.toLowerCase().includes(search.toLowerCase())
  )

  const indexOfLastModel = currentPage * modelsPerPage
  const indexOfFirstModel = indexOfLastModel - modelsPerPage
  const currentModels = filteredModels.slice(indexOfFirstModel, indexOfLastModel)

  useEffect(() => {
    fetchModels().then(setModels)
  }, [])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleCreate = async (
    brandId: string,
    modelCode: string,
    modelName: string
  ): Promise<{ success: boolean; error?: string }> => {
    const result = await createModel(brandId, modelCode, modelName)
    if (result.success) {
      console.log('Model created:', result.data)
      fetchModels().then(setModels)
    } else {
      console.error('Error:', result.error)
    }
    return result
  }

  const handleDelete = (id: string) => {
    deleteModel(id).then(() => fetchModels().then(setModels))
    router.push(pathname)
  }

  return (
    <div className="hidden px-4 md:block md:px-8">
      <div className="flex flex-col">
        <div className="flex items-center justify-between py-4">
          <span className="flex-1 text-2xl">Model</span>
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
          headers={['Model Code', 'Model Name', 'Actions']}
          data={currentModels}
          renderRow={(model: Model) => (
            <>
              <td className="border border-gray-300 px-4 py-2 text-center">{model.modelCode}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">{model.modelName}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                <div className="flex items-center justify-center gap-2 text-white">
                  <button
                    onClick={() => router.push(`${pathname}/edit/${model.id}`)}
                    className="rounded-md bg-yellow-400 p-2 hover:bg-yellow-500">
                    <PenSquare size={16} />
                  </button>
                  <form onSubmit={handleSubmit(() => handleDelete(model.id))}>
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
          totalItems={filteredModels.length}
          itemsPerPage={modelsPerPage}
          onPageChange={handlePageChange}
        />
        <Modal isOpen={isModal} onClose={() => setIsModal(false)} onSubmit={handleCreate} />
      </div>
    </div>
  )
}

export default Models

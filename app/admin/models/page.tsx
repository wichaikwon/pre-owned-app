'use client'

import Modal from '@/app/components/admin/model/modal'
import Pagination from '@/hooks/pagination'
import { createModel } from '@/lib/models/createModel'
import { deleteModel } from '@/lib/models/deleteModel'
import { fetchModels } from '@/lib/models/getModel'
import { SquarePen, Trash2 } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

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

  const handleCreateModel = async (
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
  const handleDeleteModel = (id: string) => {
    deleteModel(id).then(() => fetchModels().then(setModels))
    router.push(pathname)
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
      <div className="flex w-full flex-col items-center justify-center gap-2 px-80">
        <input
          className="w-full rounded-md border p-2"
          placeholder="Search models..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="flex w-full items-center justify-between gap-4 border-b py-2 font-bold">
          <div className="flex w-full pl-4">Code</div>
          <div className="flex w-full justify-start">Name</div>
          <div className="flex w-60 justify-center pr-4">Action</div>
        </div>
        <div className="flex w-full flex-col items-center justify-between gap-2 py-2">
          {currentModels.map(
            (model, idx) =>(
                <div key={idx} className="flex w-full items-center justify-between gap-4 border-b py-2">
                  <div className="flex w-full pl-6">{model.modelCode}</div>
                  <div className="flex w-full justify-start">{model.modelName}</div>
                  <div className="flex w-60 justify-center gap-2 pr-4">
                    <button
                      onClick={() => router.push(`${pathname}/edit/${model.id}`)}
                      className="flex items-center justify-center rounded-md bg-yellow-500 px-4 py-2 text-white hover:bg-yellow-600">
                      <SquarePen size={16} />
                    </button>
                    <form onSubmit={handleSubmit(() => handleDeleteModel(model.id))}>
                      <button
                        type="submit"
                        className="flex items-center justify-center rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600">
                        <Trash2 size={16} />
                      </button>
                    </form>
                  </div>
                </div>
              )
          )}
        </div>
        <Pagination
          currentPage={currentPage}
          totalItems={filteredModels.length}
          itemsPerPage={modelsPerPage}
          onPageChange={setCurrentPage}
        />
      </div>
      <Modal isOpen={isModal} onClose={() => setIsModal(false)} onSubmit={handleCreateModel} />
    </div>
  )
}
export default Models

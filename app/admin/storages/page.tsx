'use client'
import { PenSquare, SquarePen, Trash2 } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Pagination from '@/hooks/pagination'
import { fetchStorages } from '@/lib/storages/getStorage'
import { createStorage } from '@/lib/storages/createStorage'
import Modal from '@/app/components/admin/storage/modal'
import { deleteStorage } from '@/lib/storages/deleteStroage'

type Storages = {
  id: string
  storageCode: string
  storageValue: string
}

const Storages: React.FC = () => {
  const router = useRouter()
  const { handleSubmit } = useForm()
  const pathname = usePathname()
  const [storages, setStorages] = useState<Storages[]>([])
  const [search, setSearch] = useState('')
  const [isModal, setIsModal] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const brandsPerPage = 10

  const filteredBrands = storages.filter((storage) => storage.storageValue.toLowerCase().includes(search.toLowerCase()))

  const indexOfLastStorage = currentPage * brandsPerPage
  const indexOfFirstStorage = indexOfLastStorage - brandsPerPage
  const currentStorages = filteredBrands.slice(indexOfFirstStorage, indexOfLastStorage)

  useEffect(() => {
    fetchStorages().then(setStorages)
  }, [])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleCreateStorage = async (
    storageCode: string,
    storageValue: string
  ): Promise<{ success: boolean; error?: string }> => {
    const result = await createStorage(storageCode, storageValue)

    if (result.success) {
      console.log('Storage created:', result.data)
      fetchStorages().then(setStorages)
    } else if (result) {
      console.error('Error:', result.error)
    }

    return result
  }

  const handleDelete = (id: string) => {
    deleteStorage(id).then(() => fetchStorages().then(setStorages))
    router.push(pathname)
  }

  return (
    <div className="flex flex-col gap-2 px-10">
      <div className="flex items-center justify-between py-2">
        <h1>Storages</h1>
        <button
          className="flex items-center justify-center rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600"
          onClick={() => setIsModal(true)}>
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
                  'Storage Code',
                  'Storage Value',
                  'Actions',
                ].map((header, idx) => (
                  <th key={idx} className="border border-gray-300 px-4 py-2 text-center">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentStorages.map((storage, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 text-center">{storage.storageCode}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{storage.storageValue}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => router.push(`${pathname}/edit/${storage.id}`)}
                        className="flex items-center justify-center rounded-md bg-yellow-500 px-3 py-2 text-white hover:bg-yellow-600">
                        <PenSquare size={16} />
                      </button>
                      <form onSubmit={handleSubmit(() => handleDelete(storage.id))}>
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
          totalItems={filteredBrands.length}
          itemsPerPage={brandsPerPage}
          onPageChange={handlePageChange}
        />
      </div>
      <Modal isOpen={isModal} onClose={() => setIsModal(false)} onSubmit={handleCreateStorage} />
    </div>
  )
}

export default Storages

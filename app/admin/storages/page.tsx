'use client'
import { PenSquare, SquarePen, Trash2 } from 'lucide-react'
import Table from '@/app/components/admin/table/Table'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Pagination from '@/hooks/pagination'
import { fetchStorages } from '@/lib/storages/getStorage'
import { createStorage } from '@/lib/storages/createStorage'
import Modal from '@/app/components/admin/modal/StorageModal'
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

  const filteredBrands = storages.filter(
    (storage) =>
      storage.storageCode.toLowerCase().includes(search.toLowerCase()) ||
      storage.storageValue.toLowerCase().includes(search.toLowerCase())
  )

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
    <div className="hidden px-4 md:block md:px-8">
      <div className="flex flex-col">
        <div className="flex items-center justify-between py-4">
          <span className="flex-1 text-2xl">Storage</span>
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
          headers={['Storage Code', 'Storage Name', 'Actions']}
          data={currentStorages}
          renderRow={(storage: Storages) => (
            <>
              <td className="border border-gray-300 px-4 py-2 text-center">{storage.storageCode}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">{storage.storageValue}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                <div className="flex items-center justify-center gap-2 text-white">
                  <button
                    onClick={() => router.push(`${pathname}/edit/${storage.id}`)}
                    className="rounded-md bg-yellow-400 p-2 hover:bg-yellow-500">
                    <PenSquare size={16} />
                  </button>
                  <form onSubmit={handleSubmit(() => handleDelete(storage.id))}>
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
          totalItems={filteredBrands.length}
          itemsPerPage={brandsPerPage}
          onPageChange={handlePageChange}
        />
        <Modal isOpen={isModal} onClose={() => setIsModal(false)} onSubmit={handleCreateStorage} />
      </div>
    </div>
  )
}

export default Storages

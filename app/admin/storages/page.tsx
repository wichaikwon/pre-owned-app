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
    <div className="flex flex-col px-4 md:px-8">
      <Table
        title="Storages"
        headers={['Brand Code', 'Brand Name', 'Actions']}
        data={currentStorages}
        search={search}
        onSearchChange={setSearch}
        onCreate={() => setIsModal(true)}
        renderRow={(storage: Storages) => (
          <>
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
  )
}

export default Storages

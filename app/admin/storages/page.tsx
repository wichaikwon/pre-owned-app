'use client'
import { SquarePen, Trash2 } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Pagination from '@/hooks/pagination'
import Modal from '@/app/components/admin/brand/modal'
import { fetchBrands } from '@/lib/brands/getBrand'
import { deleteBrand } from '@/lib/brands/deleteBrand'
import { createBrand } from '@/lib/brands/createBrand'

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
      storage.storageValue.toLowerCase().includes(search.toLowerCase()) ||
      storage.storageValue.toLowerCase().includes(search.toLowerCase())
  )
  const indexOfLastStorage = currentPage * brandsPerPage
  const indexOfFirstStorage = indexOfLastStorage - brandsPerPage
  const currentStorages = filteredBrands.slice(indexOfFirstStorage, indexOfLastStorage)

  useEffect(() => {
    // fetchBrands().then(setBrands)
  }, [])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  //   const handleCreateBrand = async (
  //     brandCode: string,
  //     brandName: string
  //   ): Promise<{ success: boolean; error?: string }> => {
  //     const result = await createBrand(brandCode, brandName)

  //     if (result.success) {
  //       console.log('Brand created:', result.data)
  //       fetchBrands().then(setBrands)
  //     } else {
  //       console.error('Error:', result.error)
  //     }

  //     return result
  //   }
  const handleDelete = (id: string) => {
    // deleteBrand(id).then(() => fetchBrands().then(setBrands))
    // router.push(pathname)
  }
  return (
    <div className="flex flex-col gap-2 px-10">
      <div className="flex items-center justify-between py-2">
        <h1>Brands</h1>
        <button
          className="flex items-center justify-center rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600"
          onClick={() => setIsModal(true)}>
          Create
        </button>
      </div>
      <div className="flex w-full flex-col items-center justify-center gap-2 px-80">
        <input
          className="w-full rounded-md border p-2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search brands..."
        />
        <div className="flex w-full items-center justify-between gap-4 border-b py-2 font-bold">
          <div className="flex w-full pl-4">Code</div>
          <div className="flex w-full justify-start">Name</div>
          <div className="flex w-60 justify-center pr-4">Action</div>
        </div>
        <div className="flex w-full flex-col items-center justify-between gap-2 py-2">
          {currentStorages.map((storage, idx) => (
            <div key={idx} className="flex w-full items-center justify-between gap-4 border-b py-2">
              <div className="flex w-full pl-6">{storage.storageCode}</div>
              <div className="flex w-full justify-start">{storage.storageValue}</div>
              <div className="flex w-60 justify-center gap-2 pr-4">
                <button
                  className="flex items-center justify-center rounded-md bg-yellow-500 px-4 py-2 text-white hover:bg-yellow-600"
                  onClick={() => router.push(`${pathname}/edit/${storage.id}`)}>
                  <SquarePen size={16} />
                </button>
                <form onSubmit={handleSubmit(() => handleDelete(storage.id))}>
                  <button
                    type="submit"
                    className="flex items-center justify-center rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600">
                    <Trash2 size={16} />
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
        <Pagination
          currentPage={currentPage}
          totalItems={filteredBrands.length}
          itemsPerPage={brandsPerPage}
          onPageChange={handlePageChange}
        />
      </div>
      {/* <Modal isOpen={isModal} onClose={() => setIsModal(false)} onSubmit={handleCreateBrand} /> */}
    </div>
  )
}

export default Storages

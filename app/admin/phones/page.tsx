'use client'
import Pagination from '@/hooks/pagination'
import { fetchBrands } from '@/lib/brands/getBrand'
import { fetchModels } from '@/lib/models/getModel'
import { fetchPhones } from '@/lib/phones/getPhone'
import { fetchStorages } from '@/lib/storages/getStorage'
import { PenSquare, Trash2 } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import Table from '@/app/components/admin/table/Table'

type Phone = {
  id: string
  brandId: string
  brandName: string
  modelId: string
  modelName: string
  storageId: string
  storageValue: string
  phoneCode: string
  phoneName: string
}

const Phones: React.FC = () => {
  const pathname = usePathname()
  const { handleSubmit } = useForm()
  const router = useRouter()
  const [phones, setPhones] = useState<Phone[]>([])
  const [search, setSearch] = useState('')
  const [isModal, setIsModal] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const phonesPerPage = 10

  const filteredPhones = useMemo(
    () =>
      phones.filter(
        (phone) =>
          phone.brandName.toLowerCase().includes(search.toLowerCase()) ||
          phone.modelName.toLowerCase().includes(search.toLowerCase()) ||
          phone.storageValue.toLowerCase().includes(search.toLowerCase()) ||
          phone.phoneCode.toLowerCase().includes(search.toLowerCase()) ||
          phone.phoneName.toLowerCase().includes(search.toLowerCase())
      ),
    [phones, search]
  )

  const indexOfLastPhone = currentPage * phonesPerPage
  const indexOfFirstPhone = indexOfLastPhone - phonesPerPage
  const currentPhones = filteredPhones.slice(indexOfFirstPhone, indexOfLastPhone)

  useEffect(() => {
    fetchPhones().then((phone) => {
      fetchModels().then((models) => {
        fetchBrands().then((brands) => {
          fetchStorages().then((storages) => {
            setPhones(
              phone.map((p: { modelId: string; brandId: string; storageId: string }) => {
                const model = models.find((m: { id: string }) => m.id === p.modelId)
                const brand = brands.find((b: { id: string }) => b.id === p.brandId)
                const storage = storages.find((s: { id: string }) => s.id === p.storageId)
                return {
                  ...p,
                  modelName: model?.modelName,
                  brandName: brand?.brandName,
                  storageValue: storage?.storageValue,
                }
              })
            )
          })
        })
      })
    })
  }, [])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleDelete = (id: string) => {
    console.log(`Delete phone with id: ${id}`)
    // deletePhone(id).then(() => fetchPhones().then(setPhones))
  }

  return (
    <div className="flex flex-col px-4 md:px-8">
      <Table
        title="Phones"
        headers={['Brand Name', 'Model Name', 'Storage Value', 'Phone Code', 'Phone Name', 'Actions']}
        data={currentPhones}
        search={search}
        onSearchChange={setSearch}
        onCreate={() => setIsModal(true)}
        renderRow={(phone: Phone) => (
          <>
            <td className="border border-gray-300 px-4 py-2 text-center">{phone.brandName}</td>
            <td className="border border-gray-300 px-4 py-2 text-center">{phone.modelName}</td>
            <td className="border border-gray-300 px-4 py-2 text-center">{phone.storageValue}</td>
            <td className="border border-gray-300 px-4 py-2 text-center">{phone.phoneCode}</td>
            <td className="border border-gray-300 px-4 py-2 text-center">{phone.phoneName}</td>
            <td className="border border-gray-300 px-4 py-2 text-center">
              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={() => router.push(`${pathname}/edit/${phone.id}`)}
                  className="flex items-center justify-center rounded-md bg-yellow-500 px-3 py-2 text-white hover:bg-yellow-600">
                  <PenSquare size={16} />
                </button>
                <form onSubmit={handleSubmit(() => handleDelete(phone.id))}>
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
        totalItems={filteredPhones.length}
        itemsPerPage={phonesPerPage}
        onPageChange={handlePageChange}
      />
      {/* Add Modal component here if needed */}
    </div>
  )
}

export default Phones
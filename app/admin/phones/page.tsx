'use client'
import Pagination from '@/hooks/pagination'
import { fetchPhones, fetchViewPhones } from '@/lib/phones/getPhone'
import { PenSquare, Trash2 } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useMemo, useState } from 'react'
import { set, useForm } from 'react-hook-form'
import Table from '@/app/components/admin/table/Table'
import PhoneModal from '@/app/components/admin/modal/PhoneModal'
import { createPhone } from '@/lib/phones/createPhone'
import { deletePhone } from '@/lib/phones/deletePhone'

type Phone = {
  phoneId: string
  brandId: string
  brandCode: string
  brandName: string
  modelId: string
  modelCode: string
  modelName: string
  storageId: string
  storageCode: string
  storageValue: string
  phoneCode: string
  phoneName: string
  price: number
  minPrice: number
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
          (phone.brandCode?.toLowerCase() || '').includes(search.toLowerCase()) ||
          (phone.brandName?.toLowerCase() || '').includes(search.toLowerCase()) ||
          (phone.modelCode?.toLowerCase() || '').includes(search.toLowerCase()) ||
          (phone.modelName?.toLowerCase() || '').includes(search.toLowerCase()) ||
          (phone.storageCode?.toLowerCase() || '').includes(search.toLowerCase()) ||
          (phone.storageValue?.toLowerCase() || '').includes(search.toLowerCase()) ||
          (phone.phoneCode?.toLowerCase() || '').includes(search.toLowerCase()) ||
          (phone.phoneName?.toLowerCase() || '').includes(search.toLowerCase()) ||
          (phone.price?.toString().toLowerCase() || '').includes(search.toLowerCase()) ||
          (phone.minPrice?.toString().toLowerCase() || '').includes(search.toLowerCase())
      ),
    [phones, search]
  )

  const indexOfLastPhone = currentPage * phonesPerPage
  const indexOfFirstPhone = indexOfLastPhone - phonesPerPage
  const currentPhones = filteredPhones.slice(indexOfFirstPhone, indexOfLastPhone)

  useEffect(() => {
    fetchViewPhones().then(setPhones)
  }, [])
  const handleCreate = async (
    brandId: string,
    modelId: string,
    storageId: string,
    phoneCode: string,
    phoneName: string,
    price: number,
    minPrice: number
  ): Promise<{ success: boolean; error?: string }> => {
    createPhone(brandId, modelId, storageId, phoneCode, phoneName, price, minPrice)
    return { success: true }
  }
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleDelete = async (id: string) => {
    deletePhone(id).then(() => setPhones(phones.filter((phone) => phone.phoneId !== id)))
  }

  return (
    <div className="flex flex-col px-4 md:px-8">
      <Table
        title="Phones"
        headers={[
          'Brand Code',
          'Brand Name',
          'Model Code',
          'Model Name',
          'Storage Code',
          'Storage Value',
          'Phone Code',
          'Phone Name',
          'Price',
          'Min Price',
          'Actions',
        ]}
        data={currentPhones}
        search={search}
        onSearchChange={setSearch}
        onCreate={() => setIsModal(true)}
        renderRow={(phone: Phone) => (
          <>
            <td className="border border-gray-300 px-4 py-2 text-center">{phone.brandCode}</td>
            <td className="border border-gray-300 px-4 py-2 text-center">{phone.brandName}</td>
            <td className="border border-gray-300 px-4 py-2 text-center">{phone.modelCode}</td>
            <td className="border border-gray-300 px-4 py-2 text-center">{phone.modelName}</td>
            <td className="border border-gray-300 px-4 py-2 text-center">{phone.storageValue}</td>
            <td className="border border-gray-300 px-4 py-2 text-center">{phone.storageCode}</td>
            <td className="border border-gray-300 px-4 py-2 text-center">{phone.phoneCode}</td>
            <td className="border border-gray-300 px-4 py-2 text-center">{phone.phoneName}</td>
            <td className="border border-gray-300 px-4 py-2 text-center">{phone.price}</td>
            <td className="border border-gray-300 px-4 py-2 text-center">{phone.minPrice}</td>
            <td className="border border-gray-300 px-4 py-2 text-center">
              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={() => router.push(`${pathname}/edit/${phone.phoneId}`)}
                  className="flex items-center justify-center rounded-md bg-yellow-500 px-3 py-2 text-white hover:bg-yellow-600">
                  <PenSquare size={16} />
                </button>
                <form onSubmit={handleSubmit(() => handleDelete(phone.phoneId))}>
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
      <PhoneModal isOpen={isModal} onClose={() => setIsModal(false)} onSubmit={handleCreate} />
    </div>
  )
}

export default Phones

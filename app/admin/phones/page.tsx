'use client'
import Pagination from '@/hooks/pagination'
import { fetchViewPhones } from '@/lib/phones/getPhone'
import { PenSquare, Trash2 } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import PhoneModal from '@/app/components/admin/modal/PhoneModal'
import { createPhone } from '@/lib/phones/createPhone'
import { deletePhone } from '@/lib/phones/deletePhone'
import Table from '@/app/components/admin/table/Table'

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
  const { handleSubmit } = useForm()
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
    <div className="hidden px-4 md:block md:px-8">
      <div className="flex flex-col">
        <div className="flex items-center justify-between py-4">
          <span className="flex-1 text-2xl">Phones</span>
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
          headers={['Brand', 'Model', 'Storage', 'Phone', 'Price', 'Min Price', 'Actions']}
          data={currentPhones}
          renderRow={(phone: Phone) => (
            <>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {phone.brandCode} - {phone.brandName}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {phone.modelCode} - {phone.modelName}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {phone.storageCode} - {phone.storageValue}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {phone.phoneCode} - {phone.phoneName}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">{phone.price.toLocaleString()}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">{phone.minPrice.toLocaleString()}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                <div className="flex items-center justify-center gap-2 text-white">
                  <button className="rounded-md bg-yellow-400 p-2 hover:bg-yellow-500">
                    <PenSquare size={16} />
                  </button>
                  <form onSubmit={handleSubmit(() => handleDelete(phone.phoneId))}>
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
          totalItems={filteredPhones.length}
          itemsPerPage={phonesPerPage}
          onPageChange={handlePageChange}
        />
        <PhoneModal isOpen={isModal} onClose={() => setIsModal(false)} onSubmit={handleCreate} />
      </div>
    </div>
  )
}

export default Phones

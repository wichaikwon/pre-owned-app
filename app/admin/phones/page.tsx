'use client'
import Pagination from '@/hooks/pagination'
import { fetchBrands } from '@/lib/brands/getBrand'
import { fetchModels } from '@/lib/models/getModel'
import { fetchPhones } from '@/lib/phones/getPhone'
import { fetchStorage, fetchStorages } from '@/lib/storages/getStorage'
import { PenSquare, Trash2 } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import React, { use, useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'

type Phone = {
  id: string
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
}
const Phones: React.FC = () => {
  const pathname = usePathname()
  const { handleSubmit, register, setValue } = useForm<Phone>()
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
          phone.brandCode.toLowerCase().includes(search.toLowerCase()) ||
          phone.brandName.toLowerCase().includes(search.toLowerCase()) ||
          phone.modelCode.toLowerCase().includes(search.toLowerCase()) ||
          phone.modelName.toLowerCase().includes(search.toLowerCase()) ||
          phone.storageCode.toLowerCase().includes(search.toLowerCase()) ||
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
      fetchModels().then((model: { id: string; modelCode: string; modelName: string }[]) => {
        fetchBrands().then((brand: { id: string; brandCode: string; brandName: string }[]) => {
          fetchStorages().then((storage: { id: string; storageCode: string; storageValue: string }[]) => {
            setPhones(
              phone.map((phone: Phone) => {
                const modelData = model.find((m) => m.id === phone.modelId)
                const brandData = brand.find((b) => b.id === phone.brandId)
                const storageData = storage.find((s) => s.id === phone.storageId)
                return {
                  ...phone,
                  modelCode: modelData?.modelCode,
                  modelName: modelData?.modelName,
                  brandCode: brandData?.brandCode,
                  brandName: brandData?.brandName,
                  storageCode: storageData?.storageCode,
                  storageValue: storageData?.storageValue,
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
    // deletePhone(id).then(() => fetchPhones().then(setPhones))
    router.push(pathname)
  }
  return (
    <div className="flex flex-col gap-2 px-10">
      <div className="flex items-center justify-between py-2">
        <h1>Phones</h1>
        <button
          onClick={() => setIsModal(true)}
          className="flex items-center justify-center rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600">
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
        <div className="w-8/12 overflow-x-auto shadow-lg rounded-md">
          <table className="border-collapse border border-gray-300 whitespace-nowrap">
            <thead>
              <tr className="bg-gray-100">
                {[
                  'Brand Code',
                  'Brand Name',
                  'Model Code',
                  'Model Name',
                  'Storage Code',
                  'Storage Value',
                  'Phone Code',
                  'Phone Name',
                  'Actions',
                ].map((header, idx) => (
                  <th key={idx} className="border border-gray-300 px-4 py-2 text-center">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentPhones.map((phone, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 text-center">{phone.brandCode}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{phone.brandName}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{phone.modelCode}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{phone.modelName}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{phone.storageCode}</td>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination
          currentPage={currentPage}
          totalItems={filteredPhones.length}
          itemsPerPage={phonesPerPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  )
}

export default Phones

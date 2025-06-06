'use client'
import Pagination from '@/hooks/pagination'
import { fetchPhones } from '@/lib/phones/getPhone'
import { fetchModels } from '@/lib/models/getModel'
import { fetchBrands } from '@/lib/brands/getBrand'
import { fetchStorages } from '@/lib/storages/getStorage'
import { PenSquare } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useMemo, useState } from 'react'
import Table from '@/app/components/admin/table/Table'

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
  price: number
  minPrice: number
}

const Dashboard: React.FC = () => {
  const pathname = usePathname()
  const router = useRouter()
  const [phones, setPhones] = useState<Phone[]>([])
  const [search, setSearch] = useState('')
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
                  modelCode: model?.modelCode,
                  modelName: model?.modelName,
                  brandCode: brand?.brandCode,
                  brandName: brand?.brandName,
                  storageCode: storage?.storageCode,
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

  return (
    <div className="flex flex-col px-4 md:px-8">
      <div className="flex flex-col">
        <div className="flex items-center justify-between py-4">
          <span className="text-2xl flex-1">Phones</span>
          <input
            className="flex rounded-md flex-1 border p-2"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          <div className='flex-1' />
        </div>
        <Table
          headers={[
            'Actions',
            'Storage Value',
            'Phone Name',
            'Price',
            'Min Price',
            'Storage Code',
            'Phone Code',
            'Brand Code',
            'Brand Name',
            'Model Code',
            'Model Name',
          ]}
          data={currentPhones}
          renderRow={(phone: Phone) => (
            <>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  onClick={() =>
                    router.push(`${pathname}/edit/${phone.brandId}/${phone.modelId}/${phone.storageId}/${phone.id}`)
                  }
                  className="flex w-full items-center justify-center rounded-md bg-yellow-500 py-2 text-white hover:bg-yellow-600">
                  <PenSquare size={16} />
                </button>
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">{phone.storageValue}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">{phone.phoneName}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">{phone.price.toLocaleString()}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">{phone.minPrice.toLocaleString()}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">{phone.storageCode}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">{phone.phoneCode}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">{phone.brandCode}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">{phone.brandName}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">{phone.modelCode}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">{phone.modelName}</td>
            </>
          )}
        />
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

export default Dashboard

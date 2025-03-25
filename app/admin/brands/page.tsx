'use client'
import { PenSquare, Trash2 } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Pagination from '@/hooks/pagination'
import Modal from '@/app/components/admin/modal/BrandModal'
import { fetchBrands } from '@/lib/brands/getBrand'
import { deleteBrand } from '@/lib/brands/deleteBrand'
import { createBrand } from '@/lib/brands/createBrand'
import Table from '@/app/components/admin/table/Table'

type Brand = {
  id: string
  brandCode: string
  brandName: string
}

const Brands: React.FC = () => {
  const router = useRouter()
  const { handleSubmit } = useForm()
  const pathname = usePathname()
  const [brands, setBrands] = useState<Brand[]>([])
  const [search, setSearch] = useState('')
  const [isModal, setIsModal] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const brandsPerPage = 10

  const filteredBrands = brands.filter(
    (brand) =>
      brand.brandName.toLowerCase().includes(search.toLowerCase()) ||
      brand.brandCode.toLowerCase().includes(search.toLowerCase())
  )

  const indexOfLastBrand = currentPage * brandsPerPage
  const indexOfFirstBrand = indexOfLastBrand - brandsPerPage
  const currentBrands = filteredBrands.slice(indexOfFirstBrand, indexOfLastBrand)

  useEffect(() => {
    fetchBrands().then(setBrands)
  }, [])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleCreateBrand = async (
    brandCode: string,
    brandName: string
  ): Promise<{ success: boolean; error?: string }> => {
    const result = await createBrand(brandCode, brandName)
    if (result.success) {
      console.log('Brand created:', result.data)
      fetchBrands().then(setBrands)
    } else {
      console.error('Error:', result.error)
    }

    return result
  }

  const handleDelete = (id: string) => {
    deleteBrand(id).then(() => fetchBrands().then(setBrands))
    router.push(pathname)
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
          <div className='flex flex-1 justify-end'>
            <button
              onClick={() => setIsModal(true)}
              className="rounded-md bg-green-500 p-2 text-white hover:bg-green-600">
              Create
            </button>
          </div>
        </div>
        <Table
          headers={['Brand Code', 'Brand Name', 'Actions']}
          data={currentBrands}
          renderRow={(brand: Brand) => (
            <>
              <td className="border border-gray-300 px-4 py-2 text-center">{brand.brandCode}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">{brand.brandName}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                <div className="flex items-center justify-center gap-2 text-white">
                  <button
                    onClick={() => router.push(`${pathname}/edit/${brand.id}`)}
                    className="rounded-md bg-yellow-400 p-2 hover:bg-yellow-500">
                    <PenSquare size={16} />
                  </button>
                  <form onSubmit={handleSubmit(() => handleDelete(brand.id))}>
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
        <Modal isOpen={isModal} onClose={() => setIsModal(false)} onSubmit={handleCreateBrand} />
      </div>
    </div>
  )
}

export default Brands

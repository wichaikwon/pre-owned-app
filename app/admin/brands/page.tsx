'use client'
import { PenSquare, SquarePen, Trash2 } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Pagination from '@/hooks/pagination'
import Modal from '@/app/components/admin/brand/modal'
import { fetchBrands } from '@/lib/brands/getBrand'
import { deleteBrand } from '@/lib/brands/deleteBrand'
import { createBrand } from '@/lib/brands/createBrand'

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
    <div className="flex flex-col gap-2 px-10">
      <div className="flex items-center justify-between py-2">
        <h1>Brands</h1>
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
          <table className="border-collapse border border-gray-300 w-full">
            <thead>
              <tr className="bg-gray-100">
                {['Brand Code', 'Brand Name', 'Actions'].map((header, idx) => (
                  <th key={idx} className="border border-gray-300 px-4 py-2 text-center">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentBrands.map((brand, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 text-center">{brand.brandCode}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{brand.brandName}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => router.push(`${pathname}/edit/${brand.id}`)}
                        className="flex items-center justify-center rounded-md bg-yellow-500 px-3 py-2 text-white hover:bg-yellow-600">
                        <PenSquare size={16} />
                      </button>
                      <form onSubmit={handleSubmit(() => handleDelete(brand.id))}>
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
      <Modal isOpen={isModal} onClose={() => setIsModal(false)} onSubmit={handleCreateBrand} />
    </div>
  )
}

export default Brands

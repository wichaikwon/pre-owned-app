'use client'
import { deleteBrand, fetchBrands } from '@/lib/brands'
import { SquarePen, Trash2 } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Pagination from '@/hooks/pagination'

type Brand = {
  id: string
  brandName: string
  isDeleted: boolean
}

const Brands: React.FC = () => {
  const router = useRouter()
  const { handleSubmit } = useForm()
  const pathname = usePathname()
  const [brands, setBrands] = useState<Brand[]>([])
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const brandsPerPage = 10

  const filteredBrands = brands.filter((brand) => brand.brandName.toLowerCase().includes(search.toLowerCase()))
  const indexOfLastBrand = currentPage * brandsPerPage
  const indexOfFirstBrand = indexOfLastBrand - brandsPerPage
  const currentBrands = filteredBrands.slice(indexOfFirstBrand, indexOfLastBrand)

  useEffect(() => {
    fetchBrands().then(setBrands)
  }, [])

  const handleDelete = (id: string) => {
    deleteBrand(id).then(() => fetchBrands().then(setBrands))
    router.push('/admin/brands')
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <div className="px-10">
      <h1>Brands</h1>
      <div className="flex w-full flex-col items-center justify-center px-80">
        <input
          className="w-full rounded-md border p-2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search brands..."
        />
        {currentBrands.map(
          (brand, idx) =>
            !brand.isDeleted && (
              <div className="grid w-full grid-cols-2 items-center gap-4 border-b py-2" key={idx}>
                <div className="font-medium">{brand.brandName}</div>
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => router.push(`${pathname}/edit/${brand.id}`)}
                    className="rounded-md bg-yellow-500 px-4 py-2 text-white">
                    <SquarePen size={16} />
                  </button>
                  <form onSubmit={handleSubmit(() => handleDelete(brand.id))} className="inline">
                    <button type="submit" className="rounded-md bg-red-500 px-4 py-2 text-white">
                      <Trash2 size={16} />
                    </button>
                  </form>
                </div>
              </div>
            )
        )}
        <Pagination
          currentPage={currentPage}
          totalItems={filteredBrands.length}
          itemsPerPage={brandsPerPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  )
}

export default Brands
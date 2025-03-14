'use client'
import { deleteBrand, fetchBrands } from '@/lib/brands'
import { SquarePen, Trash2 } from 'lucide-react'
import { redirect, usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

type Brand = {
  id: string
  brandName: string
}

const Brands: React.FC = () => {
  const pathname = usePathname()
  const [brands, setBrands] = useState<Brand[]>([])
  const router = useRouter()
  const { handleSubmit } = useForm()

  useEffect(() => {
    fetchBrands().then(setBrands)
  }, [])

  const handleDelete = (id: string) => {
    deleteBrand(id).then(() => fetchBrands().then(setBrands))
    router.push('/admin/brands')
  }
  return (
    <div className="px-10">
      <h1>Brands</h1>
      <div className="flex w-full flex-col items-center justify-center px-80">
        {brands.map(
          (brand, idx) =>
            brand.isDeleted === false && (
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
      </div>
    </div>
  )
}

export default Brands

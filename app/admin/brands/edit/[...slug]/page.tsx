'use client'
import { fetchBrand } from '@/lib/brands/getBrand'
import { updateBrand } from '@/lib/brands/updateBrand'
import { useRouter, usePathname } from 'next/navigation'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'

type Brand = {
  brandCode: string
  brandName: string
}

const EditBrand: React.FC = () => {
  const pathname = usePathname()
  const parts = pathname.split('/')
  const id = parts[4]
  const { register, handleSubmit, reset } = useForm<Brand>()
  const router = useRouter()

  useEffect(() => {
    fetchBrand(id)
      .then((brand) => {
        reset({ brandName: brand.brandName })
        console.log('brand', brand)
      })
      .catch((error) => {
        console.error('Failed to fetch brand:', error)
      })
  }, [id, reset])

  const onSubmit = async (data: Brand) => {
    try {
      await updateBrand(id, data.brandName)
      router.push('/admin/brands')
    } catch (error) {
      console.error('Failed to update brand:', error)
    }
  }

  return (
    <div className="flex flex-col gap-4 px-10">
      <div className="flex items-center justify-between py-2">
        <h1>Edit Brand</h1>
        <button
          onClick={() => router.push('/admin/brands')}
          className="rounded-md bg-slate-400 px-4 py-2 text-white hover:bg-slate-500">
          Back
        </button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" className="rounded-md border p-2" placeholder="Brand Name" {...register('brandName')} />
        <button type="submit" className="rounded-md bg-blue-500 px-4 py-2 text-white">
          Save
        </button>
      </form>
    </div>
  )
}

export default EditBrand

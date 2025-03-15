'use client'
import { fetchBrand, updateBrand } from '@/lib/brands'
import { redirect, usePathname } from 'next/navigation'
import React, { useEffect } from 'react'
import { set, useForm } from 'react-hook-form'

type Brand = {
  brandName: string
}

const EditBrand: React.FC = () => {
  const pathname = usePathname()
  const parts = pathname.split('/')
  const id = parts[parts.length - 1]

  const { register, handleSubmit, setValue } = useForm<Brand>()

  useEffect(() => {
    fetchBrand(id).then((brand) => {
      setValue('brandName', brand.brandName)
    })
  }, [id, setValue])

  const onSubmit = (data: Brand) => {
    updateBrand(id, data.brandName)
    setTimeout(() => {
      redirect('/admin/brands')
    }, 1000)
  }
  return (
    <div>
      <h1>Edit Brand</h1>

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

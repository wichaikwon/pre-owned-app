'use client'
import { fetchBrand, fetchBrands } from '@/lib/brands/getBrand'
import { fetchModel } from '@/lib/models/getModel'
import { updateModel } from '@/lib/models/updateModel'
import { useRouter, usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

type Model = {
  brandId: string
  brandCode: string
  brandName: string
  modelCode: string
  modelName: string
  isDeleted: boolean
}
const EditBrand: React.FC = () => {
  const router = useRouter()
  const pathname = usePathname()
  const parts = pathname.split('/')
  const id = parts[4]
  const { register, handleSubmit, setValue } = useForm<Model>()
  const [searchBrand, setSearchBrand] = useState('')
  const [isOpenBrand, setIsOpenBrand] = React.useState(false)
  const [brands, setBrands] = useState<{ id: string; brandCode: string; brandName: string; isDeleted: boolean }[]>([])
  const filterBrands = brands.filter(
    (brand) =>
      brand.brandName.toLowerCase().includes(searchBrand.toLowerCase()) ||
      brand.brandCode.toLowerCase().includes(searchBrand.toLowerCase())
  )
  const [selectedBrand, setSelectedBrand] = useState<{
    id: string
    brandCode: string
    brandName: string
    isDeleted: boolean
  }>({
    id: '',
    brandCode: '',
    brandName: '',
    isDeleted: false,
  })
  useEffect(() => {
    fetchModel(id)
      .then((model) => {
        fetchBrand(model.brandId)
          .then((brand) => {
            setValue('brandId', brand.brandId)
            setValue('brandCode', brand.brandCode)
            setValue('brandName', brand.brandName)
            setValue('modelCode', model.modelCode)
            setValue('modelName', model.modelName)
            setSelectedBrand({
              id: brand.id,
              brandCode: brand.brandCode,
              brandName: brand.brandName,
              isDeleted: false,
            })
          })
          .catch((error) => {
            console.error('Failed to fetch brand:', error)
          })
      })
      .catch((error) => {
        console.error('Failed to fetch model:', error)
      })
    fetchBrands().then(setBrands)
  }, [id, setValue])
  const onSubmit = (data: Model) => {
    updateModel(id, data.brandId, data.brandCode, data.modelName)
      .then(() => {
        router.push('/admin/models')
      })
      .catch((error) => {
        console.error('Failed to update model:', error)
      })
  }

  return (
    <div className="flex flex-col gap-4 px-4 md:px-8">
      <div className="flex items-center justify-between py-2">
        <h1>Edit Model</h1>
        <button
          onClick={() => router.push('/admin/models')}
          className="rounded-md bg-slate-400 px-4 py-2 text-white hover:bg-slate-500">
          Back
        </button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex w-full gap-4">
        <div className="relative">
          <button
            type="button"
            className="flex w-60 rounded-md border p-2"
            onClick={() => setIsOpenBrand(!isOpenBrand)}>
            <p className={`${selectedBrand.brandName !== '' ? 'text-black' : 'text-gray-500'}`}>
              {selectedBrand.brandCode && selectedBrand.brandName
                ? `${selectedBrand.brandCode} - ${selectedBrand.brandName}`
                : 'Select Brand'}
            </p>
          </button>
          {isOpenBrand && (
            <div className="absolute mt-0.5 h-80 overflow-y-auto rounded-md border bg-white p-2">
              <input
                className="mb-1 rounded-md border p-2"
                value={searchBrand}
                placeholder="eg. 101 ,iPhone,Samsung"
                onChange={(e) => setSearchBrand(e.target.value)}
                autoFocus
              />
              {filterBrands.length > 1 &&
                filterBrands.map(
                  (brand, idx) =>
                    !brand.isDeleted && (
                      <div
                        key={idx}
                        className={`flex flex-col items-center justify-between rounded-md`}
                        onClick={() => {
                          setSelectedBrand(brand)
                          setValue('brandId', brand.id)
                          setValue('brandCode', brand.brandCode)
                          setValue('brandName', brand.brandName)
                          setIsOpenBrand(false)
                        }}>
                        <button className="flex w-full p-2 hover:bg-gray-200">
                          <p className="flex w-full">
                            {brand.brandCode} - {brand.brandName}
                          </p>
                        </button>
                        <hr className="w-full p-1" />
                      </div>
                    )
                )}
            </div>
          )}
        </div>
        <input type="text" className="rounded-md border p-2" placeholder="Model Name" {...register('modelName')} />
        <button type="submit" className="rounded-md bg-blue-500 px-4 py-2 text-white">
          Save
        </button>
      </form>
    </div>
  )
}

export default EditBrand

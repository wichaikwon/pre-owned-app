'use client'
import { fetchBrand } from '@/lib/brands/getBrand'
import { fetchModel } from '@/lib/models/getModel'
import { fetchPhone } from '@/lib/phones/getPhone'
import { updatePhone } from '@/lib/phones/updatePhone'
import { fetchStorage } from '@/lib/storages/getStorage'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { set, useForm } from 'react-hook-form'

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

const EditPhone: React.FC = () => {
  const pathname = usePathname()
  const parts = pathname.split('/')
  const id = parts[4]
  const router = useRouter()
  const { handleSubmit, setValue, register } = useForm<Phone>()

  useEffect(() => {
    fetchPhone(id).then((phone) => {
      fetchModel(phone.modelId).then((model) => {
        fetchBrand(phone.brandId).then((brand) => {
          fetchStorage(phone.storageId).then((storage) => {
            setValue('id', phone.id)
            setValue('brandId', phone.brandId)
            setValue('brandCode', brand.brandCode)
            setValue('brandName', brand.brandName)
            setValue('modelId', phone.modelId)
            setValue('modelCode', model.modelCode)
            setValue('modelName', model.modelName)
            setValue('storageId', phone.storageId)
            setValue('storageCode', storage.storageCode)
            setValue('storageValue', storage.storageValue)
            setValue('phoneCode', phone.phoneCode)
            setValue('phoneName', phone.phoneName)
          })
        })
      })
    })
  }, [id, setValue])

  const onSubmit = async (data: Phone) => {
    try {
      await updatePhone(data.id, data.phoneName)
      router.push('/admin/phones')
    } catch (error) {
      console.error('Failed to update phone:', error)
    }
  }
  return (
    <div className="flex flex-col px-4 md:px-8">
      <div className="flex items-center justify-between py-2">
        <h1>Edit Phone</h1>
        <button
          onClick={() => router.push('/admin/phones')}
          className="rounded-md bg-slate-400 px-4 py-2 text-white hover:bg-slate-500">
          Back
        </button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex w-full gap-4">
        {[
          { label: 'Brand Name', field: 'brandName' },
          { label: 'Model Name', field: 'modelName' },
          { label: 'Storage Value', field: 'storageValue' },
          { label: 'Phone Code', field: 'phoneCode' },
        ].map(({ label, field }) => (
          <div key={field} className="flex flex-col">
            <p>{label}</p>
            <input
              type="text"
              className="cursor-not-allowed rounded-md border border-slate-400 bg-slate-200 p-2 text-black/50"
              {...register(field as keyof Phone)}
              disabled
            />
          </div>
        ))}
        <div className="flex flex-col">
          <p>Phone Name</p>
          <input type="text" className="rounded-md border border-slate-400 p-2" {...register('phoneName')} />
        </div>
        <div className="flex items-end justify-end">
          <button type="submit" className="rounded-md bg-blue-500 px-4 py-2 text-white">
            Save
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditPhone

'use client'
import { fetchStorage } from '@/lib/storages/getStorage'
import { updateStorage } from '@/lib/storages/updateStorage'
import { useRouter, usePathname } from 'next/navigation'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'

type Storage = {
  storageCode: string
  storageValue: string
}

const EditStorage: React.FC = () => {
  const pathname = usePathname()
  const parts = pathname.split('/')
  const id = parts[4]
  const { register, handleSubmit, setValue } = useForm<Storage>()
  const router = useRouter()

  useEffect(() => {
    fetchStorage(id)
      .then((storage) => {
        setValue('storageCode', storage.storageCode)
        setValue('storageValue', storage.storageValue)
        console.log('storage', storage)
      })
      .catch((error) => {
        console.error('Failed to fetch storage:', error)
      })
  }, [id, setValue])

  const onSubmit = async (data: Storage) => {
    try {
      await updateStorage(id, data.storageCode, data.storageValue)
      router.push('/admin/storages')
    } catch (error) {
      console.error('Failed to update brand:', error)
    }
  }

  return (
    <div className="flex flex-col gap-4 px-10">
      <div className="flex items-center justify-between py-2">
        <h1>Edit Brand</h1>
        <button
          onClick={() => router.push('/admin/storages')}
          className="rounded-md bg-slate-400 px-4 py-2 text-white hover:bg-slate-500">
          Back
        </button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2">
        <input type="text" className="rounded-md border p-2" placeholder="Storage Code" {...register('storageCode')} />
        <input
          type="text"
          className="w-[500] rounded-md border p-2"
          placeholder="Storage Name"
          {...register('storageValue')}
        />
        <button type="submit" className="rounded-md bg-blue-500 px-4 py-2 text-white">
          Save
        </button>
      </form>
    </div>
  )
}

export default EditStorage

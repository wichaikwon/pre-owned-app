'use client'
import { fetchDefect } from '@/lib/defects/getDefect'
import { updateDefect } from '@/lib/defects/updateDefect'
import { useRouter, usePathname } from 'next/navigation'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'

type Defect = {
  defectCode: string
  defectName: string
}

const EditDefect: React.FC = () => {
  const pathname = usePathname()
  const parts = pathname.split('/')
  const id = parts[4]
  const { register, handleSubmit, setValue } = useForm<Defect>()
  const router = useRouter()

  useEffect(() => {
    fetchDefect(id)
      .then((defect) => {
        setValue('defectCode', defect.defectCode)
        setValue('defectName', defect.defectName)
      })
      .catch((error) => {
        console.error('Failed to fetch brand:', error)
      })
  }, [id, setValue])

  const onSubmit = async (data: Defect) => {
    try {
      await updateDefect(id, data.defectName)
      router.push('/admin/defects')
    } catch (error) {
      console.error('Failed to update brand:', error)
    }
  }

  return (
    <div className="flex flex-col gap-4 px-10">
      <div className="flex items-center justify-between py-2">
        <h1>Edit Defect</h1>
        <button
          onClick={() => router.push('/admin/defects')}
          className="rounded-md bg-slate-400 px-4 py-2 text-white hover:bg-slate-500">
          Back
        </button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-1 gap-2'>
        <input type="text" className="rounded-md border p-2 flex disabled:text-gray-500 disabled:bg-gray-200 " disabled placeholder="Defect Code" {...register('defectCode')} />
        <input type="text" className="rounded-md border p-2 flex w-[400px]" placeholder="Defect Name" {...register('defectName')} />
        <button type="submit" className="rounded-md bg-blue-500 px-4 py-2 text-white">
          Save
        </button>
      </form>
    </div>
  )
}

export default EditDefect

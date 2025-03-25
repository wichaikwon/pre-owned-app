'use client'
import { fetchDefectChoice } from '@/lib/defectChoices/getDefectChoices'
import { updateDefectChoices } from '@/lib/defectChoices/updateDefectChoices'
import { fetchDefect, fetchDefects } from '@/lib/defects/getDefect'
import { useRouter, usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

type DefectChoice = {
  defectId: string
  defectCode: string
  defectName: string
  choiceCode: string
  choiceName: string
  isDeleted: boolean
}
const EditDefectChoice: React.FC = () => {
  const router = useRouter()
  const pathname = usePathname()
  const parts = pathname.split('/')
  const id = parts[4]

  const { register, handleSubmit, setValue } = useForm<DefectChoice>()
  const [searchDefect, setSearchDefect] = useState('')
  const [isOpenDefect, setIsOpenDefect] = useState(false)
  const [defects, setDefects] = useState<{ id: string; defectCode: string; defectName: string; isDeleted: boolean }[]>(
    []
  )
  const [selectedDefect, setSelectedDefect] = useState<{
    id: string
    defectCode: string
    defectName: string
    isDeleted: boolean
  }>({
    id: '',
    defectCode: '',
    defectName: '',
    isDeleted: false,
  })

  const filterDefects = defects.filter(
    (defect) =>
      defect.defectCode.toLowerCase().includes(searchDefect.toLowerCase()) ||
      defect.defectName.toLowerCase().includes(searchDefect.toLowerCase())
  )

  useEffect(() => {
    if (!id) {
      console.error('ID is undefined. Check the pathname structure.')
      return
    }

    fetchDefectChoice(id)
      .then((choice) => {
        if (choice.defectId) {
          fetchDefect(choice.defectId)
            .then((defect) => {
              setValue('defectId', defect.id)
              setValue('defectCode', defect.defectCode)
              setValue('defectName', defect.defectName)
              setValue('choiceCode', choice.choiceCode)
              setValue('choiceName', choice.choiceName)
              setSelectedDefect({
                id: defect.id,
                defectCode: defect.defectCode,
                defectName: defect.defectName,
                isDeleted: false,
              })
            })
            .catch((error) => {
              console.error('Failed to fetch defect:', error)
            })
        } else {
          console.error('defectId not found in choice:', choice)
        }
      })
      .catch((error) => {
        console.error('Failed to fetch defect choice:', error)
      })

    fetchDefects()
      .then(setDefects)
      .catch((error) => {
        console.error('Failed to fetch defects:', error)
      })
  }, [id, setValue])

  const onSubmit = async (data: DefectChoice) => {
    try {
      updateDefectChoices(id, data.defectId, data.choiceCode, data.choiceName)
      router.push('/admin/defect-choices')
    } catch (error) {
      console.error('Failed to update model:', error)
    }
  }

  return (
    <div className="flex flex-col gap-4 px-4 md:px-8">
      <div className="flex items-center justify-between py-2">
        <h1>Edit Defect Choice</h1>
        <button
          onClick={() => router.push('/admin/defect-choices')}
          className="rounded-md bg-slate-400 px-4 py-2 text-white hover:bg-slate-500">
          Back
        </button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex w-full gap-4">
        <div className="relative">
          <button
            type="button"
            disabled
            className="flex w-60 rounded-md border p-2 disabled:bg-gray-200"
            onClick={() => setIsOpenDefect(!isOpenDefect)}>
            <p className={`${selectedDefect.defectName !== '' ? 'text-black' : 'text-gray-500'} text-gray-500`}>
              {selectedDefect.defectCode && selectedDefect.defectName
                ? `${selectedDefect.defectCode} - ${selectedDefect.defectName}`
                : 'Select Brand'}
            </p>
          </button>
          {isOpenDefect && (
            <div className="absolute mt-0.5 h-80 overflow-y-auto rounded-md border bg-white p-2">
              <input
                className="mb-1 rounded-md border p-2"
                value={searchDefect}
                placeholder="eg. 101 ,iPhone,Samsung"
                onChange={(e) => setSearchDefect(e.target.value)}
                autoFocus
              />
              {filterDefects.length > 1 &&
                filterDefects.map(
                  (defect, idx) =>
                    !defect.isDeleted && (
                      <div
                        key={idx}
                        className={`flex flex-col items-center justify-between rounded-md`}
                        onClick={() => {
                          setSelectedDefect(defect)
                          setValue('defectId', defect.id)
                          setValue('defectCode', defect.defectCode)
                          setValue('defectName', defect.defectName)
                          setIsOpenDefect(false)
                        }}>
                        <button className="flex w-full p-2 hover:bg-gray-200">
                          <p className="flex w-full">
                            {defect.defectCode} - {defect.defectName}
                          </p>
                        </button>
                        <hr className="w-full p-1" />
                      </div>
                    )
                )}
            </div>
          )}
        </div>
        <input
          type="text"
          className="rounded-md border p-2 disabled:bg-gray-200 disabled:text-gray-500"
          disabled
          placeholder="Model Code"
          {...register('choiceCode')}
        />
        <input type="text" className="rounded-md border p-2" placeholder="Model Name" {...register('choiceName')} />
        <button type="submit" className="rounded-md bg-blue-500 px-4 py-2 text-white">
          Save
        </button>
      </form>
    </div>
  )
}

export default EditDefectChoice

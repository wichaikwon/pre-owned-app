'use client'
import { fetchDefectChoices } from '@/lib/defectChoices/getDefectChoices'
import { fetchDefects } from '@/lib/defects/getDefect'
import { fetchPhones } from '@/lib/phones/getPhone'
import { fetchPriceDeductionByPhoneId } from '@/lib/priceDeductions/getPriceDeduction'
import { updatePriceDeductions } from '@/lib/priceDeductions/updateDeduction'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useMemo, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { toast } from 'react-toastify'

type PriceDeduction = {
  id: string
  configBrandId: string
  phoneId: string
  phoneCode: string
  phoneName: string
  defectId: string
  defectCode: string
  defectName: string
  defectChoiceId: string
  choiceCode: string
  deduction: number
  choiceName: string
  isDeleted: boolean
}

const EditDashboard: React.FC = () => {
  const router = useRouter()
  const pathname = usePathname()
  const parts = pathname.split('/')
  const id = parts[parts.length - 1]
  const [priceDeduction, setPriceDeduction] = useState<PriceDeduction[]>([])
  const { handleSubmit, setValue, register } = useForm<Record<string, number>>({
    defaultValues: {},
  })

  const groupedDefects = useMemo(
    () =>
      priceDeduction.reduce(
        (acc, { defectName, ...deduction }) => {
          ;(acc[defectName] ||= []).push({ defectName, ...deduction })
          return acc
        },
        {} as Record<string, PriceDeduction[]>
      ),
    [priceDeduction]
  )

  useEffect(() => {
    Promise.all([fetchPriceDeductionByPhoneId(id), fetchPhones(), fetchDefects(), fetchDefectChoices()]).then(
      ([priceDeduction, phones, defects, choices]) => {
        const enrichedData = priceDeduction.map((pd: PriceDeduction) => {
          const phoneData = phones.find((p: { id: string }) => p.id === pd.phoneId)
          const choiceData = choices.find((c: { id: string }) => c.id === pd.defectChoiceId)
          const defectData = defects.find((d: { id: string }) => d.id === choiceData?.defectId)
          return {
            ...pd,
            phoneCode: phoneData?.phoneCode,
            phoneName: phoneData?.phoneName,
            defectCode: defectData?.defectCode,
            defectName: defectData?.defectName,
            choiceCode: choiceData?.choiceCode,
            choiceName: choiceData?.choiceName,
          }
        })
        setPriceDeduction(enrichedData)
        enrichedData.forEach((deduction: PriceDeduction) => {
          setValue(`${deduction.defectName}+${deduction.id}`, deduction.deduction)
        })
      }
    )
  }, [id, setValue])

  const onSubmit = (data: Record<string, number>) => {
    Object.entries(data).forEach(([key, value]) => {
      const [_, id] = key.split('+')
      updatePriceDeductions([{ id, deduction: value }])
    })
    setTimeout(() => {
      toast.success('updated Deductions Success', {
        position: 'bottom-right',
        autoClose: 2000,
        hideProgressBar: false,
        pauseOnHover: true,
        draggable: true,
        theme: 'colored',
      })
      router.push('/admin')
    }, 1000)
  }

  return (
    <div className="flex w-full flex-col gap-2 px-4 md:px-8">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center justify-between">
          <h1>Edit Dashboard</h1>
          <button type="submit" className="mt-4 rounded-md bg-blue-500 p-2 text-white">
            Save
          </button>
        </div>
        {Object.entries(groupedDefects).map(([defectName, deductions]) => (
          <div key={defectName} className="flex flex-col">
            <h2 className="text-lg">{defectName}</h2>
            <div className="grid grid-cols-5 gap-4 rounded-md bg-slate-200 p-2">
              {deductions.map((deduction) => (
                <div key={deduction.id}>
                  <p>{deduction.choiceName}</p>
                  <input
                    className="rounded-md border bg-white p-2"
                    type="number"
                    {...register(`${deduction.defectName}+${deduction.id}`, {
                      valueAsNumber: true,
                      onChange: (e) => {
                        const value = e.target.value
                        const numericValue = value === '' ? 0 : Math.max(0, Number(value))
                        setValue(`${deduction.defectName}+${deduction.id}`, numericValue)
                      },
                    })}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </form>
    </div>
  )
}
export default EditDashboard

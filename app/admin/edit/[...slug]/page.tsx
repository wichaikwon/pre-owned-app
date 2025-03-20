'use client'
import { fetchDefectChoices } from '@/lib/defectChoices/getDefectChoices'
import { fetchDefects } from '@/lib/defects/getDefect'
import { fetchPhones } from '@/lib/phones/getPhone'
import { fetchPriceDeductionByPhoneId } from '@/lib/priceDeductions/getPriceDeduction'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'

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
  deduction: string
  choiceName: string
  isDeleted: boolean
}

const EditDashboard: React.FC = () => {
  const pathname = usePathname()
  const parts = pathname.split('/')
  const id = parts[parts.length - 1]
  const [priceDeduction, setPriceDeduction] = useState<PriceDeduction[]>([])
  const { control, handleSubmit, setValue } = useForm<{ deductions: PriceDeduction[] }>({
    defaultValues: { deductions: [] },
  })

  useEffect(() => {
    Promise.all([fetchPriceDeductionByPhoneId(id), fetchPhones(), fetchDefects(), fetchDefectChoices()]).then(
      ([priceDeduction, phones, defects, choices]) => {
        const enrichedData = priceDeduction.map((pd: PriceDeduction) => {
          const phoneData = phones.find((p: { id: string }) => p.id === pd.phoneId)
          const choiceData = choices.find((c: { id: string }) => c.id === pd.defectChoiceId)
          const defectData = defects.find((d: { id: any }) => d.id === choiceData?.defectId)
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
        setValue('deductions', enrichedData)
      }
    )
  }, [id, setValue])

  const onSubmit = (data: { deductions: PriceDeduction[] }) => {
    console.log('Form Data:', data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 px-4 md:px-8">
      <h1>Edit Dashboard</h1>
      {priceDeduction.map((deduction, idx) => (
        <div key={idx} className="flex items-center gap-2">
          <p>{deduction.choiceName}</p>
          <Controller
            name={`deductions.${idx}.deduction`}
            control={control}
            render={({ field }) => (
              <input
                {...field}
                className="rounded-md border p-2"
                type="number"
                onChange={(e) => field.onChange(e.target.value)}
              />
            )}
          />
        </div>
      ))}
      <button type="submit" className="mt-4 rounded-md bg-blue-500 p-2 text-white">
        Save
      </button>
    </form>
  )
}

export default EditDashboard

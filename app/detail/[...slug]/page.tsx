'use client'

import { useResult } from '@/contexts/useResult'
import { fetchViewPhoneWithDeductionsByPhoneId, finalPrice } from '@/lib/phones/getPhone'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import React, { Fragment, useEffect, useMemo, useState } from 'react'
import { set, useForm } from 'react-hook-form'

type Phone = {
  brandId: string
  brandName: string
  modelId: string
  modelName: string
  storageId: string
  storageValue: string
  phoneId: string
  phoneName: string
  defectId: string
  defectIndex: number
  defectName: string
  configId: string
  choiceId: string
  choiceIndex: number
  choiceName: string
  price: number
  minPrice: number
  deduction: number
}

const Detail: React.FC = () => {
  const pathname = usePathname()
  const parts = pathname.split('/')
  const slug = parts[2]
  const router = useRouter()
  const { setResult, setChoiceName, setPhoneData } = useResult()
  const [phone, setPhone] = useState<Phone[]>([])
  const [openModal, setOpenModal] = useState<string>('')
  const { setValue, handleSubmit, watch } = useForm<{ defectChoices: Record<string, string[]> }>({
    defaultValues: { defectChoices: {} },
  })

  useEffect(() => {
    fetchViewPhoneWithDeductionsByPhoneId(slug).then(setPhone)
  }, [slug])
  if (!phone) return <div>Loading...</div>

  const groupedDefects = useMemo(
    () =>
      phone.reduce(
        (acc, { defectName, ...deduction }) => {
          ;(acc[defectName] ||= []).push({ defectName, ...deduction })
          return acc
        },
        {} as Record<string, Phone[]>
      ),
    [phone]
  )
  useEffect(() => {
    if (Object.keys(groupedDefects).length > 0) {
      setOpenModal(Object.keys(groupedDefects)[0])
    }
  }, [groupedDefects])

  const handleOpenModal = (currentDefect: string) => {
    const defectKeys = Object.keys(groupedDefects)
    const currentIndex = defectKeys.indexOf(currentDefect)
    const nextDefect = defectKeys[(currentIndex + 1) % defectKeys.length]
    currentIndex !== defectKeys.length - 1
      ? setOpenModal(openModal === currentDefect ? nextDefect : currentDefect)
      : setOpenModal(currentDefect)
  }
  const onSubmit = () => {
    const ids = Object.values(watch('defectChoices')).reduce((acc, cur) => acc.concat(cur), [])
    finalPrice(slug, ids).then((response) => {
      setResult(response)
    })
    router.push('/buy')
  }
  const handleSelectChoice = (defectName: string, choiceId: string) => {
    const currentChoices = watch('defectChoices')
    const existingChoices = currentChoices[defectName] || []
    let updatedChoices
    if (Object.keys(groupedDefects).pop() === defectName) {
      updatedChoices = existingChoices.includes(choiceId)
        ? existingChoices.filter((id) => id !== choiceId)
        : [...existingChoices, choiceId]
    } else {
      updatedChoices = [choiceId]
    }
    setValue('defectChoices', { ...currentChoices, [defectName]: updatedChoices })
  }
  const handleSelectChoiceName = (choiceName: string) => {
    setChoiceName((prev) => [...prev, choiceName])
    setPhoneData(phone[0].brandName + ' ' + phone[0].modelName + ' ' + phone[0].storageValue)
  }
  return (
    <Fragment>
      <div className="container mx-auto flex justify-between px-4 md:my-10 md:px-20">
        <div className="flex flex-1 gap-10 rounded-md">
          <div className="flex w-96 flex-col gap-4 text-xs">
            <div className="flex flex-col gap-2 rounded-md bg-gradient-to-tl from-yellow-200 to-yellow-100 p-4">
              <p>การรักษาความปลอดภัยของ Apple</p>
              <p>
                Ipad หากทำการลบข้อมูลการตั้งค่าของเครื่อง จะหมดปัญหาความเสี่ยงเกี่ยวกับการรั่วไหลของข้อมูลเครื่อง
                เพราะฉะนั้นผู้ใช้สามารถวางใจในการขายสินค้าโทรศัพท์ให้แก่ทางบริษัท
              </p>
              <p>
                1
                ไฟล์แต่ละไฟล์ในIpadจะมีการเข้ารหัสแบบสร้างขึ้นเองและจะได้รับการจัดเก็บอย่างปลอดภัยในฮาทร์ดิสก์ของIpad{' '}
              </p>
              <p>
                2 หากผู้ใช้ทำการลบข้อมูลและคืนการตั้งค่าเดิมทั้งหมดเทียบเท่ากับการลบไฟล์ทั้งหมดในIpad จะไม่มี
                โอกาสในการกู้ข้อมูลและการตั้งค่าคืนกลับมา
              </p>
            </div>
          </div>

          <div className="flex flex-1 flex-col rounded-md">
            <p className="px-4 py-2 text-2xl font-bold">
              {phone[0]?.brandName} {phone[0]?.modelName} {phone[0]?.storageValue}
            </p>
            <div className="flex flex-1 flex-col gap-2 rounded-md px-4 py-2">
              {Object.entries(groupedDefects).map(([defectName, defects]) => (
                <div key={defectName} className="flex flex-1 flex-col items-start rounded-md bg-slate-200 p-2">
                  <div className="flex w-full items-center justify-between">
                    <button
                      className="flex flex-1 items-center p-1"
                      onClick={() => {
                        handleOpenModal(defectName)
                        setOpenModal(defectName)
                      }}>
                      {defectName}
                    </button>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-yellow-500">
                        {Object.keys(groupedDefects).pop() === defectName
                          ? `มี ${
                              (watch('defectChoices')[defectName] || []).filter((id: string) =>
                                defects.some((defect) => defect.choiceId === id)
                              ).length
                            } ข้อ`
                          : (watch('defectChoices')[defectName] || [])
                              .filter((id) => defects.some((defect) => defect.choiceId === id))
                              .map((id) => defects.find((defect) => defect.choiceId === id)?.choiceName)}
                      </span>
                      {openModal !== defectName ? <ChevronRight size={16} /> : <ChevronDown size={16} />}
                    </div>
                  </div>
                  <div className="grid w-full flex-1 grid-cols-3 gap-2">
                    {openModal === defectName &&
                      defects.map((defect) => {
                        const selectedChoices = watch('defectChoices')[defectName] || []
                        const isSelected = selectedChoices.includes(defect.choiceId)

                        return (
                          <button
                            key={defect.choiceId}
                            onClick={() => {
                              handleSelectChoice(defectName, defect.choiceId)
                              handleOpenModal(defectName)
                              handleSelectChoiceName(defect.choiceName)
                            }}
                            className={`flex rounded-md border p-2 text-xs ${isSelected ? 'border-yellow-400 bg-yellow-50' : 'border-white bg-white'} hover:border-yellow-400 hover:bg-yellow-50`}>
                            {defect.choiceName}
                          </button>
                        )
                      })}
                  </div>
                </div>
              ))}
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-1 px-4">
              <button
                type="submit"
                className="flex flex-1 items-center justify-center rounded-md bg-yellow-400 p-2 text-white disabled:bg-gray-400"
                disabled={Object.entries(groupedDefects).some(
                  ([defectName]) => !watch('defectChoices')[defectName]?.length
                )}>
                ส่งข้อมูล
              </button>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default Detail

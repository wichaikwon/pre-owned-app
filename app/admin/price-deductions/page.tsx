'use client'
import Table from '@/app/components/admin/table/Table'
import Pagination from '@/hooks/pagination'
import React, { useEffect, useState } from 'react'
import { Ban, CircleCheckBig } from 'lucide-react'
import { fetchDefectChoices } from '@/lib/defectChoices/getDefectChoices'
import { fetchPriceDeductions } from '@/lib/priceDeductions/getPriceDeduction'
import { fetchConfigBrands } from '@/lib/configBrands/getConfigBrands'
import { fetchPhones } from '@/lib/phones/getPhone'

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
  choiceName: string
  isDeleted: boolean
}

type ApiResponse = {
  data: PriceDeduction[]
  page: number
  per_page: number
  total: number
  total_pages: number
}

const PriceDeduction: React.FC = () => {
  const [apiResponse, setApiResponse] = useState<ApiResponse>({
    data: [],
    page: 1,
    per_page: 10,
    total: 0,
    total_pages: 0,
  })
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [_, setIsLoading] = useState(false)
  console.log(_)

  const fetchData = async (page: number) => {
    setIsLoading(true)
    try {
      const priceDeductionData = await fetchPriceDeductions(page)
      const configBrand = await fetchConfigBrands()
      const phone = await fetchPhones()
      const defectChoice = await fetchDefectChoices()

      const enrichedData = priceDeductionData.data.map((priceDeduction: PriceDeduction) => {
        const configBrandData = configBrand.find((c: { id: string }) => c.id === priceDeduction.configBrandId)
        const defectChoiceData = defectChoice.find((d: { id: string }) => d.id === priceDeduction.defectChoiceId)
        const phoneData = phone.find((p: { id: string }) => p.id === priceDeduction.phoneId)
        return {
          ...priceDeduction,
          phoneCode: phoneData?.phoneCode,
          phoneName: phoneData?.phoneName,
          defectCode: configBrandData?.defectCode,
          defectName: configBrandData?.defectName,
          choiceCode: defectChoiceData?.choiceCode,
          choiceName: defectChoiceData?.choiceName,
        }
      })

      setApiResponse({
        ...priceDeductionData,
        data: enrichedData,
      })
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData(currentPage)
  }, [currentPage])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <div className="hidden px-4 md:block md:px-8">
      <div className="flex flex-col">
      <div className="flex items-center justify-between py-4">
          <span className="flex-1 text-2xl">Phones</span>
          <input
            className="flex flex-1 rounded-md border p-2"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          <div className='flex flex-1 ' />
        </div>
        <Table
          headers={['Brand ', 'Defect ', 'Choice', 'Status']}
          data={apiResponse.data}
          renderRow={(configBrand: PriceDeduction) => (
            <>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {configBrand.phoneCode} - {configBrand.phoneName}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {configBrand.defectCode} - {configBrand.defectName}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {configBrand.choiceCode} - {configBrand.choiceName}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                <div className="flex items-center justify-center">
                  {configBrand.isDeleted ? (
                    <Ban className="rotate-90 text-red-500" />
                  ) : (
                    <CircleCheckBig className="text-green-500" />
                  )}
                </div>
              </td>
            </>
          )}
        />

        <Pagination
          currentPage={apiResponse.page}
          totalItems={apiResponse.total_pages}
          onPageChange={handlePageChange}
          itemsPerPage={0}
        />
      </div>
    </div>
  )
}

export default PriceDeduction

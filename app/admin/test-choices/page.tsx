'use client'
import Table from '@/app/components/admin/table/Table'
import Pagination from '@/hooks/pagination'
import React, { useEffect, useMemo, useState } from 'react'
import { Ban, CircleCheckBig, PenSquare } from 'lucide-react'
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

const PriceDeduction: React.FC = () => {
  const [priceDeduction, setPriceDeduction] = useState<PriceDeduction[]>([])
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const priceDeductionPerPage = 20
  const filteredPriceDeduction = useMemo(
    () =>
      priceDeduction
        .filter(
          (priceDeduction) =>
            priceDeduction.configBrandId?.toLowerCase().includes(search.toLowerCase()) ||
            priceDeduction.defectChoiceId?.toLowerCase().includes(search.toLowerCase())
        )
        .sort((a, b) => {
          if (a.phoneCode < b.phoneCode) return -1
          if (a.phoneCode > b.phoneCode) return 1
          if (a.choiceCode < b.choiceCode) return -1
          if (a.choiceCode > b.choiceCode) return 1
          if (a.defectCode < b.defectCode) return -1
          if (a.defectCode > b.defectCode) return 1
          return 0
        }),
    [priceDeduction, search]
  )
  const indexOfLastPriceDeduction = currentPage * priceDeductionPerPage
  const indexOfFirstPriceDeduction = indexOfLastPriceDeduction - priceDeductionPerPage
  const currentPriceDeduction = filteredPriceDeduction.slice(indexOfFirstPriceDeduction, indexOfLastPriceDeduction)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }
  useEffect(() => {
    fetchPriceDeductions().then((priceDeduction) => {
      fetchConfigBrands().then((configBrand) => {
        fetchPhones().then((phone) => {
          fetchDefectChoices().then((defectChoice) => {
            setPriceDeduction(
              priceDeduction.map((priceDeduction: PriceDeduction) => {
                const configBrandData = configBrand.find((c: { id: string }) => c.id === priceDeduction.configBrandId)
                const defectChoiceData = defectChoice.find(
                  (d: { id: string }) => d.id === priceDeduction.defectChoiceId
                )
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
            )
          })
        })
      })
    })
  }, [])
  console.log(priceDeduction)
  return (
    <div className="flex flex-col px-4 md:px-8">
      <Table
        title="Config Brands"
        headers={['Brand ', 'Defect ', 'Choice', 'Status', 'Actions']}
        data={currentPriceDeduction}
        search={search}
        onSearchChange={setSearch}
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
                  <Ban className="text-red-500" />
                ) : (
                  <CircleCheckBig className="text-green-500" />
                )}
              </div>
            </td>
            <td className="border border-gray-300 px-4 py-2 text-center">
              <div className="flex items-center justify-center gap-2">
                <button className="flex shrink-0 items-center justify-center rounded-md bg-yellow-500 px-3 py-2 text-white hover:bg-yellow-600">
                  <PenSquare size={16} />
                </button>
              </div>
            </td>
          </>
        )}
      />
      <Pagination
        currentPage={currentPage}
        totalItems={filteredPriceDeduction.length}
        itemsPerPage={priceDeductionPerPage}
        onPageChange={handlePageChange}
      />
    </div>
  )
}
export default PriceDeduction

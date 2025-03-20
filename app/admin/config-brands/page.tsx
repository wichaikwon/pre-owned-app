'use client'
import { fetchConfigBrands } from '@/lib/configBrands/getConfigBrands'
import { updateStatusConfigBrands } from '@/lib/configBrands/updateStatusConfigBrands'
import Table from '@/app/components/admin/table/Table'
import Pagination from '@/hooks/pagination'
import React, { useEffect, useMemo, useState } from 'react'
import { Ban, CircleCheckBig, PenSquare } from 'lucide-react'

type ConfigBrand = {
  id: string
  brandId: string
  brandCode: string
  brandName: string
  defectId: string
  defectCode: string
  defectName: string
  isDeleted: boolean
}

const ConfigBrands: React.FC = () => {
  const [configBrands, setConfigBrands] = useState<ConfigBrand[]>([])
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const brandsPerPage = 12
  const filteredConfigBrands = useMemo(
    () =>
      configBrands
        .filter(
          (configBrand) =>
            configBrand.brandCode.toLowerCase().includes(search.toLowerCase()) ||
            configBrand.brandName.toLowerCase().includes(search.toLowerCase()) ||
            configBrand.defectCode.toLowerCase().includes(search.toLowerCase()) ||
            configBrand.defectName.toLowerCase().includes(search.toLowerCase())
        )
        .sort((a, b) => {
          const brandComparison = a.brandCode.localeCompare(b.brandCode)
          return brandComparison !== 0 ? brandComparison : a.defectCode.localeCompare(b.defectCode)
        }),
    [configBrands, search]
  )
  const indexOfLastConfigBrand = currentPage * brandsPerPage
  const indexOfFirstConfigBrand = indexOfLastConfigBrand - brandsPerPage
  const currentConfigBrands = filteredConfigBrands.slice(indexOfFirstConfigBrand, indexOfLastConfigBrand)

  useEffect(() => {
    fetchConfigBrands().then(setConfigBrands)
  }, [])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const updateStatus = (id: string) => {
    updateStatusConfigBrands(id).then(() => {
      fetchConfigBrands().then(setConfigBrands)
    })
  }

  return (
    <div className="flex flex-col px-4 md:px-8">
      <Table
        title="Config Brands"
        headers={['Brand ', 'Defect', 'Status', 'Actions']}
        data={currentConfigBrands}
        search={search}
        onSearchChange={setSearch}
        renderRow={(configBrand: ConfigBrand) => (
          <>
            <td className="border border-gray-300 px-4 py-2 text-center">
              {configBrand.brandCode} - {configBrand.brandName}
            </td>
            <td className="border border-gray-300 px-4 py-2 text-center">
              {configBrand.defectCode} - {configBrand.defectName}
            </td>
            <td className="border border-gray-300 px-4 py-2 text-center">
              <div className="flex items-center justify-center">
                {configBrand.isDeleted ? (
                  <Ban className="text-red-500 rotate-90" />
                ) : (
                  <CircleCheckBig className="text-green-500" />
                )}
              </div>
            </td>
            <td className="border border-gray-300 px-4 py-2 text-center">
              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={() => updateStatus(configBrand.id)}
                  className="flex shrink-0 items-center justify-center rounded-md bg-yellow-500 px-3 py-2 text-white hover:bg-yellow-600">
                  <PenSquare size={16} />
                </button>
              </div>
            </td>
          </>
        )}
      />
      <Pagination
        currentPage={currentPage}
        totalItems={filteredConfigBrands.length}
        itemsPerPage={brandsPerPage}
        onPageChange={handlePageChange}
      />
    </div>
  )
}
export default ConfigBrands
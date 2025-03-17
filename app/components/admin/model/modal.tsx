
import { fetchBrands } from '@/lib/brands/getBrand'
import React, { useState } from 'react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (brandId: string, modelCode: string, modelName: string) => Promise<{ success: boolean; error?: string }>
}
const ModelModal: React.FC<ModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [selectedBrand, setSelectedBrand] = useState<{
    id: string
    brandCode: string
    brandName: string
    isDeleted: boolean
  }>({
    id: '',
    brandCode: '',
    brandName: '',
    isDeleted: false,
  })
  const [brands, setBrands] = useState<{ id: string; brandCode: string; brandName: string; isDeleted: boolean }[]>([])
  const [searchBrand, setSearchBrand] = useState('')
  const [isOpenBrand, setIsOpenBrand] = useState(false)
  const [modelCode, setModelCode] = useState('')
  const [modelName, setModelName] = useState('')
  const filterBrands = brands.filter(
    (brand) =>
      brand.brandName.toLowerCase().includes(searchBrand.toLowerCase()) ||
      brand.brandCode.toLowerCase().includes(searchBrand.toLowerCase())
  )
  const [error, setError] = useState<string | ''>('')

  if (!isOpen) return

  if (brands.length === 0) {
    fetchBrands().then((data) => {
      setBrands(data)
    })
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const result = await onSubmit(selectedBrand.id, modelCode, modelName)
    if (!result.success && result.error) {
      setError(result.error)
    } else {
      setError('')
      setModelCode('')
      setModelName('')
      setSelectedBrand({
        id: '',
        brandCode: '',
        brandName: '',
        isDeleted: false,
      })
      onClose() 
    }
  }
  return (
    <div
      onClick={() => onClose()}
      className="fixed top-0 left-0 flex h-full w-full items-center justify-center bg-black/50">
      <div className="flex w-3/12 flex-col gap-4 rounded-md bg-white p-4" onClick={(e) => e.stopPropagation()}>
        <p className="flex justify-center text-2xl">Create Brand</p>
        <form className="flex flex-col gap-4" onSubmit={(e) => handleSubmit(e)}>
          <div className="flex flex-col gap-2">
            <label>Brand Name</label>
            <div className="relative w-full">
              <button
                type="button"
                className="flex w-full rounded-md border p-2"
                onClick={() => setIsOpenBrand(!isOpenBrand)}>
                <p className={`${selectedBrand.brandName !== '' ? 'text-black' : 'text-gray-500'}`}>
                  {selectedBrand.brandCode && selectedBrand.brandName
                    ? `${selectedBrand.brandCode} - ${selectedBrand.brandName}`
                    : 'Select Brand'}
                </p>
              </button>
              {isOpenBrand && (
                <div className="absolute mt-0.5 h-80 w-full overflow-y-auto rounded-md border bg-white p-2">
                  <input
                    className="mb-1 w-full rounded-md border p-2"
                    value={searchBrand}
                    placeholder="eg. 101 ,iPhone,Samsung"
                    onChange={(e) => setSearchBrand(e.target.value)}
                    autoFocus
                  />
                  {filterBrands.length > 1 &&
                    filterBrands.map(
                      (brand, idx) =>
                        !brand.isDeleted && (
                          <div
                            key={idx}
                            className={`flex flex-col items-center justify-between rounded-md`}
                            onClick={() => {
                              setSelectedBrand(brand)
                              setIsOpenBrand(false)
                            }}>
                            <button className="flex w-full p-2 hover:bg-gray-200">
                              <p className="flex w-full">
                                {brand.brandCode} - {brand.brandName}
                              </p>
                            </button>
                            <hr className="w-full p-1" />
                          </div>
                        )
                    )}
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label>Brand Code</label>
            <input
              className={`rounded-md border p-2 ${error ? 'border-red-500' : ''}`}
              onChange={(e) => setModelCode(e.target.value)}
              placeholder="e.g. 001, A002, B-003"
              type="text"
              value={modelCode}
              required
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>
          <div className="flex flex-col gap-2">
            <label>Model Name</label>
            <input
              value={modelName}
              onChange={(e) => setModelName(e.target.value)}
              className="rounded-md border p-2"
              type="text"
              placeholder="e.g. iPhone 16 Pro, Galaxy S21 Ultra, 9 Pro"
              required
            />
          </div>
          <div className="flex items-center justify-end gap-4">
            <button
              className="flex items-center justify-center rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600"
              type="submit">
              Create
            </button>
            <button
              onClick={() => onClose()}
              className="flex items-center justify-center rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600"
              type="button">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ModelModal

'use client'
import { fetchBrands } from '@/lib/brands/getBrand'
import { fetchModelsByBrandId } from '@/lib/models/getModel'
import { fetchStorageByModelId } from '@/lib/phones/getPhone'
import React, { useMemo, useState } from 'react'

interface PhoneProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (
    brandId: string,
    modelId: string,
    storageId: string,
    phoneCode: string,
    phoneName: string,
    price: number,
    minPrice: number
  ) => Promise<{ success: boolean; error?: string }>
}

const PhoneModal: React.FC<PhoneProps> = ({ isOpen, onClose, onSubmit }) => {
  const [isOpenBrand, setIsOpenBrand] = useState(false)
  const [isOpenModel, setIsOpenModel] = useState(false)
  const [isOpenStorage, setIsOpenStorage] = useState(false)
  const [selectedBrand, setSelectedBrand] = useState<{
    id: string
    brandCode: string
    brandName: string
    isDeleted: boolean
  }>({ id: '', brandCode: '', brandName: '', isDeleted: false })
  const [selectedModel, setSelectedModel] = useState<{
    id: string
    brandId: string
    modelCode: string
    modelName: string
    isDeleted: boolean
  }>({ id: '', brandId: '', modelCode: '', modelName: '', isDeleted: false })
  const [selectedStorage, setSelectedStorage] = useState<{
    id: string
    storageCode: string
    storageValue: string
    isDeleted: boolean
  }>({ id: '', storageCode: '', storageValue: '', isDeleted: false })
  const [brands, setBrands] = useState<{ id: string; brandCode: string; brandName: string; isDeleted: boolean }[]>([])
  const [models, setModels] = useState<
    { id: string; brandId: string; modelCode: string; modelName: string; isDeleted: boolean }[]
  >([])
  const [storages, setStorages] = useState<
    { id: string; storageCode: string; storageValue: string; isDeleted: boolean }[]
  >([])
  const [phoneCode, setPhoneCode] = useState('')
  const [phoneName, setPhoneName] = useState('')
  const [searchBrand, setSearchBrand] = useState('')
  const [searchModel, setSearchModel] = useState('')
  const [searchStorage, setSearchStorage] = useState('')
  const [price, setPrice] = useState<number>(0)
  const [minPrice, setMinPrice] = useState<number>(0)
  const [error, setError] = useState<string | ''>('')
  const filterBrands = useMemo(() => {
    return brands.filter(
      (brand) =>
        brand.brandName.toLowerCase().includes(searchBrand.toLowerCase()) ||
        brand.brandCode.toLowerCase().includes(searchBrand.toLowerCase())
    )
  }, [brands, searchBrand])
  const filterModels = useMemo(() => {
    return models.filter(
      (model) =>
        model.modelName.toLowerCase().includes(searchModel.toLowerCase()) ||
        model.modelCode.toLowerCase().includes(searchModel.toLowerCase())
    )
  }, [models, searchModel])
  const filterStorages = useMemo(() => {
    return storages.filter(
      (storage) =>
        storage.storageValue.toLowerCase().includes(searchStorage.toLowerCase()) ||
        storage.storageCode.toLowerCase().includes(searchStorage.toLowerCase())
    )
  }, [storages, searchStorage])
  if (!isOpen) {
    return
  }
  if (brands.length === 0) {
    fetchBrands().then((data) => {
      setBrands(data)
    })
  }
  const handleModel = (brandId: string) => {
    console.log(brandId)
    fetchModelsByBrandId(brandId).then((data) => {
      setModels(data)
    })
  }
  const handleStorage = (modelId: string) => {
    fetchStorageByModelId(modelId).then((data) => {
      setStorages(data)
    })
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const result = await onSubmit(selectedBrand.id, selectedModel.id, selectedStorage.id, phoneCode, phoneName, price, minPrice)
    if (!result.success && result.error) {
      setError(result.error)
    } else {
      setError('')
      setPhoneCode('')
      setPhoneName('')
      setSelectedBrand({
        id: '',
        brandCode: '',
        brandName: '',
        isDeleted: false,
      })
      setSelectedModel({
        id: '',
        brandId: '',
        modelCode: '',
        modelName: '',
        isDeleted: false,
      })
      setSelectedStorage({
        id: '',
        storageCode: '',
        storageValue: '',
        isDeleted: false,
      })
      setPrice(0)
      setMinPrice(0)
      onClose()
    }
  }
  return (
    <div
      onClick={() => onClose()}
      className="fixed top-0 left-0 z-50 flex h-full w-full items-center justify-center bg-black/50">
      <div className="z-50 flex w-3/12 flex-col gap-4 rounded-md bg-white p-4" onClick={(e) => e.stopPropagation()}>
        <p className="flex justify-center text-2xl">Create Phones</p>
        <form className="flex flex-col gap-4" onSubmit={(e) => handleSubmit(e)}>
          <div className="flex flex-col gap-2">
            <label>Brand Name</label>
            <div className="relative w-full">
              <button
                type="button"
                className="flex w-full rounded-md border p-2"
                onClick={() => {
                  setIsOpenBrand(!isOpenBrand)
                  setIsOpenModel(false)
                  setIsOpenStorage(false)
                }}>
                <p className={`${selectedBrand.brandName !== '' ? 'text-black' : 'text-gray-500'}`}>
                  {selectedBrand.brandName !== '' ? selectedBrand.brandName : 'Select Brand'}
                </p>
              </button>
              {isOpenBrand && (
                <div
                  className={`absolute z-50 mt-0.5 w-full overflow-y-auto rounded-md border bg-white p-2 ${brands.length <= 15 ? 'h-fit' : 'h-[312px]'}`}>
                  <input
                    className="mb-1 w-full rounded-md border p-2"
                    value={searchBrand}
                    placeholder="eg. 101 ,iPhone,Samsung"
                    onChange={(e) => setSearchBrand(e.target.value)}
                    autoFocus
                  />
                  {filterBrands.length > 0 &&
                    filterBrands.map((brand, idx) => (
                      <div
                        key={idx}
                        className={`flex flex-col items-center justify-between rounded-md`}
                        onClick={() => {
                          setSelectedBrand({
                            id: brand.id,
                            brandCode: brand.brandCode,
                            brandName: brand.brandName,
                            isDeleted: brand.isDeleted,
                          })
                          setIsOpenBrand(false)
                          setSelectedModel({
                            id: '',
                            brandId: '',
                            modelCode: '',
                            modelName: '',
                            isDeleted: false,
                          })
                          setSelectedStorage({
                            id: '',
                            storageCode: '',
                            storageValue: '',
                            isDeleted: false,
                          })
                          handleModel(brand.id)
                        }}>
                        <button className={`flex w-full p-2 hover:bg-gray-200`}>
                          <p className="flex w-full">
                            {brand.brandCode} - {brand.brandName}
                          </p>
                        </button>
                        <hr className="w-full p-1" />
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label>Model Name</label>
            <div className="relative w-full">
              <button
                type="button"
                className="flex w-full rounded-md border p-2"
                onClick={() => {
                  setIsOpenModel(!isOpenModel)
                  setIsOpenBrand(false)
                  setIsOpenStorage(false)
                }}>
                <p className={`${selectedModel.modelName !== '' ? 'text-black' : 'text-gray-500'}`}>
                  {selectedModel.modelName !== '' ? selectedModel.modelName : 'Select Model'}
                </p>
              </button>
              {isOpenModel && (
                <div
                  className={`absolute z-50 mt-0.5 w-full overflow-y-auto rounded-md border bg-white p-2 ${models.length <= 5 ? 'h-fit' : 'h-[280px]'}`}>
                  <input
                    className="mb-1 w-full rounded-md border p-2"
                    value={searchModel}
                    placeholder="eg. 101 ,iPhone,Samsung"
                    onChange={(e) => setSearchModel(e.target.value)}
                    autoFocus
                  />
                  {filterModels.length > 0 &&
                    filterModels.map((model, idx) => (
                      <div
                        key={idx}
                        className={`flex flex-col items-center justify-between rounded-md`}
                        onClick={() => {
                          setSelectedModel({
                            id: model.id,
                            brandId: model.brandId,
                            modelCode: model.modelCode,
                            modelName: model.modelName,
                            isDeleted: model.isDeleted,
                          })
                          setIsOpenModel(false)
                          setSelectedStorage({
                            id: '',
                            storageCode: '',
                            storageValue: '',
                            isDeleted: false,
                          })
                          handleStorage(model.id)
                        }}>
                        <button className="flex w-full p-2 hover:bg-gray-200">
                          <p className="flex w-full">
                            {model.modelCode} - {model.modelName}
                          </p>
                        </button>
                        <hr className="w-full p-1" />
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label>Storage Value</label>
            <div className="relative w-full">
              <button
                type="button"
                className="flex w-full rounded-md border p-2"
                onClick={() => {
                  setIsOpenStorage(!isOpenStorage)
                  setIsOpenBrand(false)
                  setIsOpenModel(false)
                }}>
                <p className={`${selectedStorage.storageValue !== '' ? 'text-black' : 'text-gray-500'}`}>
                  {selectedStorage.storageValue !== '' ? selectedStorage.storageValue : 'Select Model'}
                </p>
              </button>
              {isOpenStorage && (
                <div className={`absolute z-50 mt-0.5 h-fit w-full overflow-y-auto rounded-md border bg-white p-2`}>
                  <input
                    className="mb-1 w-full rounded-md border p-2"
                    value={searchStorage}
                    placeholder="eg. 101 ,iPhone,Samsung"
                    onChange={(e) => setSearchStorage(e.target.value)}
                    autoFocus
                  />
                  {filterStorages.length > 0 &&
                    filterStorages.map((storage, idx) => (
                      <div
                        key={idx}
                        className={`flex flex-col items-center justify-between rounded-md`}
                        onClick={() => {
                          setSelectedStorage({
                            id: storage.id,
                            storageCode: storage.storageCode,
                            storageValue: storage.storageValue,
                            isDeleted: storage.isDeleted,
                          })
                          setIsOpenStorage(false)
                        }}>
                        <button className="flex w-full p-2 hover:bg-gray-200">
                          <p className="flex w-full">
                            {storage.storageCode} - {storage.storageValue}
                          </p>
                        </button>
                        <hr className="w-full p-1" />
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label>Phone Code</label>
            <input
              className={`rounded-md border p-2 ${error ? 'border-red-500' : ''}`}
              onChange={(e) => setPhoneCode(e.target.value)}
              placeholder="e.g. 001, A002, B-003"
              type="text"
              value={phoneCode}
              required
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>
          <div className="flex flex-col gap-2">
            <label>Phone Name</label>
            <input
              value={phoneName}
              onChange={(e) => setPhoneName(e.target.value)}
              className="rounded-md border p-2"
              type="text"
              placeholder="e.g. iPhone 16 Pro, Galaxy S21 Ultra, 9 Pro"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label>Price</label>
            <input
              value={price === 0 ? '' : price}
              onChange={(e) => {
                const value = e.target.value
                setPrice(value === '' ? 0 : Number(value))
              }}
              className="rounded-md border p-2"
              type="number"
              placeholder="e.g. 1000, 2000, 3000"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label>Min Price</label>
            <input
              value={minPrice === 0 ? '' : minPrice}
              onChange={(e) => {
                const value = e.target.value
                setMinPrice(value === '' ? 0 : Number(value))
              }}
              className="rounded-md border p-2"
              type="number"
              placeholder="e.g. 500, 1000, 1500"
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

export default PhoneModal

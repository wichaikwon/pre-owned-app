import { fetchViewBrands } from '@/lib/brands/getBrand'
import { fetchViewModelsByBrandId } from '@/lib/models/getModel'
import { fetchViewStoragesByModelId } from '@/lib/storages/getStorage'
import { Brand, Model, Phone } from '@/types/phones'
import { ChevronDown } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { set } from 'react-hook-form'

const SelectPhone: React.FC = () => {
  const [isOpenBrand, setIsOpenBrand] = useState<boolean>(false)
  const [isOpenModel, setIsOpenModel] = useState<boolean>(false)
  const [isOpenStorage, setIsOpenStorage] = useState<boolean>(false)
  const [brands, setBrands] = useState<Brand[]>([])
  const [searchBrand, setSearchBrand] = useState<string>('')
  const [selectedBrand, setSelectedBrand] = useState<string>('')
  const [models, setModels] = useState<Model[]>([])
  const [saerchModel, setSearchModel] = useState<string>('')
  const [selectedModel, setSelectedModel] = useState<string>('')
  const [storages, setStorages] = useState<Storage[]>([])
  const [searchStorage, setSearchStorage] = useState<string>('')
  const [selectedStorage, setSelectedStorage] = useState<string>('')
  const [phones, setPhones] = useState<Phone[]>([])
  const [currIndex, setCurrIndex] = useState<number>(0)
  const images = [
    'https://placehold.co/750x400/green/white',
    'https://placehold.co/750x400/red/white',
    'https://placehold.co/750x400/black/white',
  ]

  useEffect(() => {
    fetchViewBrands().then(setBrands)
  }, [])
  const SearchModelsByBrandId = (brandId: string) => {
    fetchViewModelsByBrandId(brandId).then(setModels)
  }
  const SearchStoragesByModelId = (modelId: string) => {
    fetchViewStoragesByModelId(modelId).then(setStorages)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrIndex((prev) => (prev + 1) % images.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [images.length])

  const handleClick = (index: number) => {
    setCurrIndex(index)
  }
  return (
    <div className="flex flex-col justify-center gap-4 bg-gradient-to-t from-yellow-500 to-yellow-300 px-4 py-4 md:flex-row lg:px-96">
      <div className="flex flex-1 items-center justify-center py-4">
        <div className="relative flex flex-col gap-2">
          <Image
            src={images[currIndex]}
            alt={`Image ${currIndex}`}
            width={750}
            height={400}
            className="rounded-md"
            style={{ width: 'auto', height: 'auto' }}
          />
          <div className="absolute right-1/2 bottom-2 flex translate-x-1/2 transform gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                className={`h-3 w-3 rounded-full ${currIndex === index ? 'bg-yellow-600' : 'bg-gray-400'}`}></button>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center md:-mb-16">
        <div className="flex flex-col items-center justify-center gap-4 rounded-md bg-white px-8 pt-8 pb-4 shadow-lg">
          <h1 className="text-xl font-bold">ประเมินราคาโทรศัพท์ที่ต้องการขาย</h1>
          <div className="flex flex-col gap-8">
            <div className="relative z-20 flex flex-col">
              <button
                onClick={() => {
                  setIsOpenBrand((prev) => !prev)
                  setIsOpenModel(false)
                  setIsOpenStorage(false)
                }}
                className={`flex items-center justify-between rounded-md border border-black p-2 ${selectedBrand ? 'text-black' : 'text-gray-400'}`}>
                <span>{selectedBrand || 'เลือกยี่ห้อ'}</span>
                <ChevronDown color="#000000" />
              </button>
              {isOpenBrand && (
                <div className="absolute top-full z-30 mt-1 w-full">
                  <input
                    className="flex w-full rounded-md border bg-white p-2"
                    value={searchBrand}
                    placeholder="ค้นหายี่ห้อ"
                    autoFocus
                    required
                    onChange={(e) => setSearchBrand(e.target.value)}
                  />
                  <div className="flex h-96 w-full flex-col items-start gap-2 overflow-y-auto rounded-md bg-white shadow-lg">
                    {brands.map((brand, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setSelectedBrand(brand.brandName)
                          SearchModelsByBrandId(brand.brandId)
                          setIsOpenBrand(false)
                          setSelectedModel('')
                          setSelectedStorage('')
                        }}
                        className="flex w-full p-2 hover:bg-blue-500 hover:text-white">
                        {brand.brandName}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="relative flex flex-col">
              <button
                onClick={() => {
                  setIsOpenModel((prev) => !prev)
                  setIsOpenBrand(false)
                  setIsOpenStorage(false)
                }}
                className={`relative flex items-center justify-between rounded-md border border-black p-2 ${selectedModel ? 'text-black' : 'text-gray-400'}`}>
                <span>{selectedModel || 'เลือกรุ่น'}</span>
                <ChevronDown color="#000000" />
              </button>
              {isOpenModel && (
                <div className="absolute top-full z-30 mt-1 w-full">
                  <input
                    className="flex w-full rounded-md border bg-white p-2"
                    value={saerchModel}
                    placeholder="ค้นหารุ่น"
                    autoFocus
                    onChange={(e) => setSearchModel(e.target.value)}
                    required
                  />
                  <div
                    className={`flex w-full flex-col items-start gap-2 overflow-y-auto rounded-md bg-white shadow-lg ${models.length <= 15 ? 'h-fit' : 'h-96'}`}>
                    {models.map((model, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setSelectedModel(model.modelName)
                          SearchStoragesByModelId(model.modelId)
                          setIsOpenBrand(false)
                          setIsOpenModel(false)
                          setSelectedStorage('')
                        }}
                        className="flex w-full p-2 hover:bg-blue-500 hover:text-white">
                        {model.modelName}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="relative flex flex-col">
              <button
                onClick={() => {
                  setIsOpenStorage((prev) => !prev)
                  setIsOpenModel(false)
                  setIsOpenBrand(false)
                }}
                className={`relative flex items-center justify-between rounded-md border border-black p-2 ${selectedStorage ? 'text-black' : 'text-gray-400'}`}>
                <span>{selectedStorage || 'เลือกความจุ'}</span>
                <ChevronDown color="#000000" />
              </button>
              {isOpenStorage && (
                <div className="absolute top-full z-30 mt-1 w-full">
                  <input
                    className="flex w-full rounded-md border bg-white p-2"
                    value={searchStorage}
                    placeholder="ค้นหาความจุ"
                    autoFocus
                    required
                    onChange={(e) => setSearchStorage(e.target.value)}
                  />
                  <div
                    className={`flex w-full flex-col items-start gap-2 overflow-y-auto rounded-md bg-white shadow-lg ${storages.length <= 15 ? 'h-fit' : 'h-96'}`}>
                    {storages.map((storage, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setSelectedStorage(storage.storageValue)
                          setIsOpenStorage(false)
                        }}
                        className="flex w-full p-2 hover:bg-blue-500 hover:text-white">
                        {storage.storageValue}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="flex flex-col gap-4">
              <button
                className="rounded-md bg-gradient-to-tl from-yellow-500 to-yellow-300 p-3 hover:from-yellow-400 hover:to-yellow-200 text-white disabled:cursor-not-allowed disabled:opacity-50"
                disabled={!selectedStorage || !selectedModel || !selectedBrand}>
                ประเมินราคา
              </button>
              <span className="text-xs">เพื่อดำเนินการต่อ ฉันยอมรับนโยบายความเป็นส่วนตัวและข้อกำหนดการใช้งาน</span>
            </div>
          </div>
        </div>
      </div>
      {isOpenBrand ||
        (isOpenModel && (
          <div
            className="fixed inset-0 z-10 bg-black/0"
            onClick={() => {
              setIsOpenBrand(false)
              setIsOpenModel(false)
              setIsOpenStorage(false)
            }}
          />
        ))}
    </div>
  )
}

export default SelectPhone

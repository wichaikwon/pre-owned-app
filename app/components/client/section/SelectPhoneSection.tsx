import { fetchViewBrands } from '@/lib/brands/getBrand'
import { fetchViewModelsByBrandId } from '@/lib/models/getModel'
import { fetchViewPhone } from '@/lib/phones/getPhone'
import { fetchViewStoragesByModelId } from '@/lib/storages/getStorage'
import { Brand, Model, Phone } from '@/types/phones'
import { ChevronDown } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const SelectPhoneSection: React.FC = () => {
  const router = useRouter()
  const [isOpenBrand, setIsOpenBrand] = useState<boolean>(false)
  const [isOpenModel, setIsOpenModel] = useState<boolean>(false)
  const [isOpenStorage, setIsOpenStorage] = useState<boolean>(false)
  const [brands, setBrands] = useState<Brand[]>([])
  const [searchBrand, setSearchBrand] = useState<string>('')
  const [selectedBrand, setSelectedBrand] = useState<{ brandId: string; brandName: string } | ''>('')
  const [models, setModels] = useState<Model[]>([])
  const [saerchModel, setSearchModel] = useState<string>('')
  const [selectedModel, setSelectedModel] = useState<{ modelId: string; modelName: string } | ''>('')
  const [storages, setStorages] = useState<Storage[]>([])
  const [searchStorage, setSearchStorage] = useState<string>('')
  const [selectedStorage, setSelectedStorage] = useState<{ storageId: string; storageValue: string } | ''>('')
  const [phone, setPhone] = useState<Phone | ''>('')
  const [currIndex, setCurrIndex] = useState<number>(0)
  const images = [
    'https://placehold.co/700x350/green/white',
    'https://placehold.co/700x350/red/white',
    'https://placehold.co/700x350/black/white',
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
  const SearchPhone = (brandId: string, modelId: string, storageId: string) => {
    fetchViewPhone(brandId, modelId, storageId).then(setPhone)
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
  const handlePhone = () => {
    phone && router.push(`/detail/${phone.phoneId}`)
  }
  return (
    <div className="flex flex-col md:flex-row bg-gradient-to-t from-yellow-500 to-yellow-300">
      <div className="container flex-col md:flex-row mx-auto flex justify-between px-8 md:px-20">
        <div className="flex flex-col items-center justify-end gap-2 rounded-md">
          <div className="relative flex  flex-col">
            <Image
              src={images[currIndex]}
              alt={`Image ${currIndex}`}
              width={100}
              height={100}
              className="rounded-md"
              style={{ width: 'auto', height: 'auto' }}
            />
            <div className="absolute right-1/2 bottom-0 flex flex-1 translate-x-1/2 transform justify-center gap-2 p-1">
              {images.map((_, index) => (
                <button
                  onClick={() => handleClick(index)}
                  key={index}
                  className={`h-3 w-3 rounded-full ${currIndex === index ? 'bg-yellow-600' : 'bg-gray-400'}`}></button>
              ))}
            </div>
          </div>
        </div>
        <div className=" flex flex-1 justify-center">
          <div className="mt-10 -mb-12 flex flex-col items-center gap-4 rounded-md z-30 bg-white px-8 pt-10 pb-4 shadow-lg">
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
                  <span>{selectedBrand ? selectedBrand.brandName : 'เลือกยี่ห้อ'}</span>
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
                            setSelectedBrand({ brandId: brand.brandId, brandName: brand.brandName })
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
                  <span>{selectedModel ? selectedModel.modelName : 'เลือกรุ่น'}</span>
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
                            setSelectedModel({ modelId: model.modelId, modelName: model.modelName })
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
                  <span>{selectedStorage ? selectedStorage.storageValue : 'เลือกความจุ'}</span>
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
                      {storages
                        .filter((storage) => storage.storageValue.toLowerCase().includes(searchStorage.toLowerCase()))
                        .map((storage, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              setSelectedStorage({
                                storageId: storage.storageId,
                                storageValue: storage.storageValue,
                              })
                              selectedBrand &&
                                selectedModel &&
                                SearchPhone(selectedBrand.brandId, selectedModel.modelId, storage.storageId)

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
                  onClick={handlePhone}
                  className="rounded-md bg-gradient-to-tl from-yellow-500 to-yellow-300 p-3 text-white disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={!selectedStorage || !selectedModel || !selectedBrand}>
                  ประเมินราคา
                </button>
                <span className="text-xs">
                  เพื่อดำเนินการต่อ ฉันยอมรับ
                  <Link href="#" className="text-yellow-400 underline">
                    นโยบายความเป็นส่วนตัว
                  </Link>
                  และ{' '}
                  <Link href="#" className="text-yellow-400 underline">
                    ข้อกำหนดการใช้งาน
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>
        {(isOpenBrand || isOpenModel || isOpenStorage) && (
          <div
            onClick={() => {
              setIsOpenBrand(false)
              setIsOpenModel(false)
              setIsOpenStorage(false)
            }}
            className="fixed inset-0 z-20 bg-black/20"></div>
        )}
      </div>
    </div>
  )
}

export default SelectPhoneSection

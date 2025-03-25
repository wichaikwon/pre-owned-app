import axios from 'axios'
import { pathAPI, pathPhonesAPI } from '../api'

export const fetchPhones = async () => {
  try {
    const response = await axios.get(`${pathAPI}/phones/phones`)
    return response.data
  } catch (error) {
    console.error('Failed to fetch Phones', error)
    return []
  }
}
export const fetchPhone = async (id: string) => {
  try {
    const response = await axios.get(`${pathAPI}/phones/phone?id=${id}`)
    return response.data
  } catch (error) {
    console.error('Failed to fetch Phone', error)
    return []
  }
}

export const finalPrice = async (phoneId: string, defectChoiceId: string[]) => {
  try {
    const response = await axios.post(`${pathPhonesAPI}/phones/final-price?id=${phoneId}`, [
      {
        phoneId,
        defectChoiceId,
      },
    ])
    return response.data
  } catch (error) {
    console.error('Failed to fetch Final Price', error)
    return []
  }
}
export const fetchStorageByModelId = async (modelId: string) => {
  try {
    const response = await axios.get(`${pathAPI}/phones/storages?model_id=${modelId}`, { withCredentials: true })
    return response.data
  } catch (error) {
    console.error('Failed to fetch Storage By Model Id', error)
    return []
  }
}
export const fetchViewPhone = async (brandId: string, modelId: string, storageId: string) => {
  try {
    const response = await axios.get(
      `${pathAPI}/phones/view-phone?brand_id=${brandId}&model_id=${modelId}&storage_id=${storageId}`
    )
    return response.data
  } catch (error) {
    console.error('Failed to fetch View Phone', error)
    return []
  }
}
export const fetchViewPhoneWithDeductionsByPhoneId = async (id: string) => {
  try {
    const response = await axios.get(`${pathAPI}/phones/view-phone-with-deductions?phone_id=${id}`)
    return response.data
  } catch (error) {
    console.error('Failed to fetch View Phone By Id', error)
    return []
  }
}

export const fetchViewPhones = async () => {
  try {
    const response = await axios.get(`${pathAPI}/phones/view-phones`)
    return response.data
  } catch (error) {
    console.error('Failed to fetch View Phones', error)
    return []
  }
}
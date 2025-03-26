import axios from 'axios'
import { pathBrandsAPI, pathPhonesAPI } from '../api'

export const fetchStorages = async () => {
  try {
    const response = await axios.get(`${pathBrandsAPI}/storages/storages`, { withCredentials: true })
    return response.data
  } catch (error) {
    console.error('Failed to fetch Storages', error)
    return []
  }
}

export const fetchStorage = async (id: string) => {
  try {
    const response = await axios.get(`${pathBrandsAPI}/storages/storage?id=${id}`, { withCredentials: true })
    return response.data
  } catch (error) {
    console.error('Failed to fetch Storage', error)
    return []
  }
}
export const fetchViewStoragesByModelId = async (modelId: string) => {
  try {
    const response = await axios.get(`${pathPhonesAPI}/phones/view-storages?model_id=${modelId}`, { withCredentials: true })
    return response.data
  } catch (error) {
    console.error('Failed to fetch Storages By ModelId', error)
    return []
  }
}
import axios from 'axios'
import { pathAPI } from '../api'

export const fetchModels = async () => {
  try {
    const response = await axios.get(`${pathAPI}/models/models`, { withCredentials: true })
    return response.data
  } catch (error) {
    console.error('Failed to fetch Models', error)
    return []
  }
}

export const fetchModel = async (id: string) => {
  try {
    const response = await axios.get(`${pathAPI}/models/model?id=${id}`, { withCredentials: true })
    return response.data
  } catch (error) {
    console.error('Failed to fetch Model', error)
    return []
  }
}

export const fetchModelsByBrandid = async (brandId: string) => {
  try {
    const response = await axios.get(`${pathAPI}/models/models/brand?brand_id=${brandId}`, { withCredentials: true })
    return response.data
  } catch (error) {
    console.error('Failed to fetch Models By BrandId', error)
    return []
  }
}

export const fetchViewModelsByBrandId = async (brandId: string) => {
  try {
    const response = await axios.get(`${pathAPI}/phones/view-models?brand_id=${brandId}`, { withCredentials: true })
    return response.data
  } catch (error) {
    console.error('Failed to fetch View Models By BrandId', error)
    return []
  }
}
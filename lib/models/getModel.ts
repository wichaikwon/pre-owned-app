import axios from 'axios'
import { pathBrandsAPI, pathPhonesAPI } from '../api'

export const fetchModels = async () => {
  try {
    const response = await axios.get(`${pathBrandsAPI}/models/models`, { withCredentials: true })
    return response.data
  } catch (error) {
    console.error('Failed to fetch Models', error)
    return []
  }
}

export const fetchModel = async (id: string) => {
  try {
    const response = await axios.get(`${pathBrandsAPI}/models/model?id=${id}`, { withCredentials: true })
    return response.data
  } catch (error) {
    console.error('Failed to fetch Model', error)
    return []
  }
}

export const fetchModelsByBrandId = async (brandId: string) => {
  try {
    const response = await axios.get(`${pathBrandsAPI}/models/models/brand?brand_id=${brandId}`, { withCredentials: true })
    return response.data
  } catch (error) {
    console.error('Failed to fetch Models By BrandId', error)
    return []
  }
}

export const fetchViewModelsByBrandId = async (brandId: string) => {
  try {
    const response = await axios.get(`${pathPhonesAPI}/phones/view-models?brand_id=${brandId}`, { withCredentials: true })
    return response.data
  } catch (error) {
    console.error('Failed to fetch View Models By BrandId', error)
    return []
  }
}
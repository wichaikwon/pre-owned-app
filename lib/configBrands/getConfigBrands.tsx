import axios from 'axios'
import { pathBrandsAPI } from '../api'

export const fetchConfigBrands = async () => {
  try {
    const response = await axios.get(`${pathBrandsAPI}/brands/config-brands`)
    return response.data
  } catch (error) {
    console.error('Failed to fetch Config Brands', error)
    return []
  }
}

export const fetchConfigBrand = async (id: string) => {
  try {
    const response = await axios.get(`${pathBrandsAPI}/brands/config-brand?id=${id}`)
    return response.data
  } catch (error) {
    console.error('Failed to fetch Config Brand', error)
    return []
  }
}
export const fetchConfigBrandByBrandId = async (id: string) => {
  try {
    const response = await axios.get(`${pathBrandsAPI}/brands/config-brands/brand?id=${id}`)
    return response.data
  } catch (error) {
    console.log('Fail to fetch Config Brand by ID', error)
    return []
  }
}

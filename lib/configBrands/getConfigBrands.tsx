import axios from 'axios'
import { pathAPI } from '../api'

export const fetchConfigBrands = async () => {
  try {
    const response = await axios.get(`${pathAPI}/brands/config-brands`)
    return response.data
  } catch (error) {
    console.error('Failed to fetch Config Brands', error)
    return []
  }
}

export const fetchConfigBrand = async (id: string) => {
  try {
    const response = await axios.get(`${pathAPI}/brands/config-brand?id=${id}`)
    return response.data
  } catch (error) {
    console.error('Failed to fetch Config Brand', error)
    return []
  }
}

import axios from 'axios'
import { pathAPI } from '../api'

export const fetchBrands = async () => {
  try {
    const response = await axios.get(`${pathAPI}/brands/brands`, { withCredentials: true })
    return response.data
  } catch (error) {
    console.error('Failed to fetch Brands', error)
    return []
  }
}

export const fetchBrand = async (id: string) => {
  try {
    const response = await axios.get(`${pathAPI}/brands/brand?id=${id}`, { withCredentials: true })
    return response.data
  } catch (error) {
    console.error('Failed to fetch Brand', error)
    return []
  }
}

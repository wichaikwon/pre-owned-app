import axios from 'axios'
import { pathBrandsAPI, pathPhonesAPI } from '../api'

export const fetchBrands = async () => {
  try {
    const response = await axios.get(`${pathBrandsAPI}/brands/brands`, { withCredentials: true })
    return response.data
  } catch (error) {
    console.error('Failed to fetch Brands', error)
    return []
  }
}

export const fetchBrand = async (id: string) => {
  try {
    const response = await axios.get(`${pathPhonesAPI}/brands/brand?id=${id}`, { withCredentials: true })
    return response.data
  } catch (error) {
    console.error('Failed to fetch Brand', error)
    return []
  }
}

export const fetchViewBrands = async () => {
  try {
    const response = await axios.get(`${pathPhonesAPI}/phones/view-brands`, { withCredentials: true })
    return response.data
  } catch (error) {
    console.error('Failed to fetch View Brands', error)
    return []
  }
}

import axios from 'axios'
import { pathBrandsAPI } from '../api'

export const updateStatusConfigBrands = async (id: string) => {
  try {
    const response = await axios.put(`${pathBrandsAPI}/brands/config-brands/update?id=${id}`, {
      withCredentials: true,
    })

    return response.data
  } catch (error) {
    console.error('Failed to delete Config Brand', error)
    return []
  }
}
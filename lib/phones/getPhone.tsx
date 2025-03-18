import axios from 'axios'
import { pathAPI } from '../api'

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

import axios from 'axios'
import { pathAPI } from '../api'

export const fetchStorages = async () => {
  try {
    const response = await axios.get(`${pathAPI}/storages/storages`, { withCredentials: true })
    return response.data
  } catch (error) {
    console.error('Failed to fetch Storages', error)
    return []
  }
}

export const fetchStorage = async (id: string) => {
  try {
    const response = await axios.get(`${pathAPI}/storages/storage?id=${id}`, { withCredentials: true })
    return response.data
  } catch (error) {
    console.error('Failed to fetch Storage', error)
    return []
  }
}

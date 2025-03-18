import axios from 'axios'
import { pathAPI } from '../api'

export const fetchDefects = async () => {
  try {
    const response = await axios.get(`${pathAPI}/defects/defects`)
    return response.data
  } catch (error) {
    console.error('Failed to fetch defects:', error)
    return []
  }
}

export const fetchDefect = async (id: string) => {
  try {
    const response = await axios.get(`${pathAPI}/defects/defect?id=${id}`)
    return response.data
  } catch (error) {
    console.error('Failed to fetch defect:', error)
    return []
  }
}

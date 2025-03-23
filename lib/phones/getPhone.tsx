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

export const finalPrice = async (phoneId: string, choiceId: string) => {
  try {
    const response = await axios.post(
      `${pathAPI}/models/finalPrice?id=${phoneId}`,
      [
        {
          phoneId,
          choiceId,
        },
      ],
      { withCredentials: true }
    )
    return response.data
  } catch (error) {
    console.error('Failed to fetch Final Price', error)
    return []
  }
}
export const fetchViewPhones = async () => {
  try {
    const response = await axios.get(`${pathAPI}/phones/view-phones`)
    return response.data
  } catch (error) {
    console.error('Failed to fetch Phones', error)
    return []
  }
}
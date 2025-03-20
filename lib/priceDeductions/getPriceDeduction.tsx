import axios from 'axios'
import { pathAPI } from '../api'

export const fetchPriceDeductions = async () => {
  try {
    const response = await axios.get(`${pathAPI}/phones/price-deductions`)
    return response.data
  } catch (error) {
    console.error('Failed to fetch Price Deductions', error)
    return []
  }
}

export const fetchPriceDeduction = async (id: string) => {
  try {
    const response = await axios.get(`${pathAPI}/phones/price-deduction?id=${id}`)
    return response.data
  } catch (error) {
    console.error('Failed to fetch Price Deduction', error)
    return []
  }
}

export const fetchPriceDeductionByPhoneId = async (phoneId: string) => {
  try {
    const response = await axios.get(`${pathAPI}/phones/price-deductions/phone?id=${phoneId}`)
    return response.data
  } catch (error) {
    console.error('Failed to fetch Price Deduction', error)
    return []
  }
}
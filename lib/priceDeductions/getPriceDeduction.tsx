import axios from 'axios'
import { pathPhonesAPI } from '../api'

export const fetchPriceDeductions = async (page:number) => {
  try {
    const response = await axios.get(`${pathPhonesAPI}/phones/price-deductions?page=${page}`)
    return response.data
  } catch (error) {
    console.error('Failed to fetch Price Deductions', error)
    return []
  }
}

export const fetchPriceDeduction = async (id: string) => {
  try {
    const response = await axios.get(`${pathPhonesAPI}/phones/price-deduction?id=${id}`)
    return response.data
  } catch (error) {
    console.error('Failed to fetch Price Deduction', error)
    return []
  }
}

export const fetchPriceDeductionByPhoneId = async (phoneId: string) => {
  try {
    const response = await axios.get(`${pathPhonesAPI}/phones/price-deductions/phone?id=${phoneId}`)
    return response.data
  } catch (error) {
    console.error('Failed to fetch Price Deduction', error)
    return []
  }
}
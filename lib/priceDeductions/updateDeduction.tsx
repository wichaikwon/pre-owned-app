import axios from 'axios'
import { pathPhonesAPI } from '../api'
import { Bounce, toast } from 'react-toastify'
export const updatePriceDeductions = async (items: { id: string; deduction: number }[]) => {
  try {
    const response = await axios.patch(`${pathPhonesAPI}/phones/price-deductions/update`, items, {
      withCredentials: true,
    })
    return response.data
  } catch (error) {
    toast.error('Failed to update Price Deductions: '+ error, {
      position: 'bottom-right',
      autoClose: 2000,
      hideProgressBar: false,
      pauseOnHover: true,
      draggable: true,
      theme: 'colored',
      transition: Bounce,
    })
    return []
  }
}

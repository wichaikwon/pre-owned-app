import axios from 'axios'
import { pathPhonesAPI } from '../api'
import { Bounce, toast } from 'react-toastify'

export const createPhone = async (
  brandId: string,
  modelId: string,
  storageId: string,
  phoneCode: string,
  phoneName: string,
  price: number,
  minPrice: number
) => {
  try {
    const response = await axios.post(
      `${pathPhonesAPI}/phones/phone/create`,
      [
        {
          brandId,
          modelId,
          storageId,
          phoneCode,
          phoneName,
          price,
          minPrice,
        },
      ],
      { withCredentials: true }
    )
    if (response.data.success) {
      toast.success('Phone created successfully!', {
        position: 'bottom-right',
        autoClose: 2000,
        hideProgressBar: false,
        pauseOnHover: true,
        draggable: true,
        theme: 'colored',
        transition: Bounce,
      })
      return { success: true, data: response.data.data }
    } else {
      toast.error(response.data.error || 'Phone Code already exists', {
        position: 'bottom-right',
        autoClose: 2000,
        hideProgressBar: false,
        pauseOnHover: true,
        draggable: true,
        theme: 'colored',
        transition: Bounce,
      })
      return { success: false, error: response.data.error }
    }
  } catch (error: unknown) {
    const errorMessage = axios.isAxiosError(error)
      ? error.response?.data?.error || error.message || 'An unexpected error occurred.'
      : 'An unexpected error occurred.'
    toast.error(errorMessage, {
      position: 'bottom-right',
      autoClose: 2000,
      hideProgressBar: false,
      pauseOnHover: true,
      draggable: true,
      theme: 'colored',
      transition: Bounce,
    })
    return { success: false, error: errorMessage }
  }
}

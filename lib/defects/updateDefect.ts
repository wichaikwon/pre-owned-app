import axios from 'axios'
import { pathDefectsAPI } from '../api'
import { Bounce, toast } from 'react-toastify'

export const updateDefect = async (id: string, defectName: string) => {
  try {
    const response = await axios.put(`${pathDefectsAPI}/defects/defects/update?id=${id}`, {
      defectName,
    })
    toast.success('Defect updated successfully!', {
      position: 'bottom-right',
      autoClose: 2000,
      hideProgressBar: false,
      pauseOnHover: true,
      draggable: true,
      theme: 'colored',
      transition: Bounce,
    })
    return { success: true, data: response.data.data }
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

import axios from 'axios'
import { pathDefectsAPI } from '../api'
import { Bounce, toast } from 'react-toastify'

export const createDefect = async (defectCode: string, defectName: string) => {
  try {
    const response = await axios.post(`${pathDefectsAPI}/defects/defect/create`, [
      {
        defectCode,
        defectName,
      },
    ])
    if (response.data.success) {
      toast.success('Defect created successfully!', {
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
      if (response.status === 409) {
        toast.error('Defect Choice already exists', {
          position: 'bottom-right',
          autoClose: 2000,
          hideProgressBar: false,
          pauseOnHover: true,
          draggable: true,
          theme: 'colored',
          transition: Bounce,
        })
      }
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

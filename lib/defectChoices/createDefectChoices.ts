import axios from 'axios'
import { pathDefectsAPI } from '../api'
import { Bounce, toast } from 'react-toastify'

export const createDefectChoices = async (defectId: string, choiceCode: string, choiceName: string) => {
  try {
    const response = await axios.post(`${pathDefectsAPI}/defect-choices/defect-choice/create`, [
      { defectId, choiceCode, choiceName },
    ])

    if (response.data.success) {
      toast.success('Defect Choice created successfully!', {
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

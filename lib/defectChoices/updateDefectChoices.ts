import { Bounce, toast } from 'react-toastify'
import { pathDefectChoicesAPI } from '../api'
import axios from 'axios'

export const updateDefectChoices = async (id: string, defectId: string, choiceCode: string, choiceName: string) => {
  try {
    const response = await axios.put(
      `${pathDefectChoicesAPI}/defect-choices/defect-choice/update?id=${id}&defect_id=${defectId}`,

      {
        choiceCode,
        choiceName,
      }
    )
    toast.success('Defect Choice updated successfully!', {
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

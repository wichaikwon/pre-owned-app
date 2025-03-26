import axios from 'axios'
import { pathBrandsAPI } from '../api'
import { Bounce, toast } from 'react-toastify'

export const createModel = async (brandId: string, modelCode: string, modelName: string) => {
  try {
    const response = await axios.post(`${pathBrandsAPI}/models/models/create`, [{ brandId, modelCode, modelName }], {
      withCredentials: true,
    })
    if (response.data.success) {
      toast.success('Model created successfully!', {
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
      toast.error(response.data.error || 'modelCode already exists', {
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
    console.log('Error in createModel:', error)
    toast.error('An unexpected error occurred.', {
      position: 'bottom-right',
      autoClose: 2000,
      hideProgressBar: false,
      pauseOnHover: true,
      draggable: true,
      theme: 'colored',
      transition: Bounce,
    })
    return { success: false, error: 'An unexpected error occurred.' }
  }
}

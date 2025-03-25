import axios from 'axios'
import { pathModelsAPI } from '../api'
import { Bounce, toast } from 'react-toastify'

export const updateModel = async (id: string, brandId: string, modelCode: string, modelName: string) => {
  try {
    const response = await axios.put(
      `${pathModelsAPI}/models/model/update?id=${id}&brand_id=${brandId}`,
      { id, brandId, modelName, modelCode },
      { withCredentials: true }
    )
    toast.success('Update Model Success !!', {
      position: 'bottom-right',
      autoClose: 2000,
      hideProgressBar: false,
      pauseOnHover: true,
      draggable: true,
      theme: 'colored',
      transition: Bounce,
    })
    return response.data
  } catch (error) {
    console.log('Error in updateModel:', error)
    toast.error('Failed to update Model', {
      position: 'bottom-right',
      autoClose: 2000,
      hideProgressBar: false,
      pauseOnHover: true,
      draggable: true,
      theme: 'colored',
      transition: Bounce,
    })
    return null
  }
}

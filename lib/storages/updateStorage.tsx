import axios from 'axios'
import { pathStoragesAPI } from '../api'
import { Bounce, toast } from 'react-toastify'

export const updateStorage = async (id: string, storageCode: string, storageValue: string) => {
  try {
    const response = await axios.put(
      `${pathStoragesAPI}/storages/storage/update?id=${id}`,
      { id, storageCode, storageValue },
      { withCredentials: true }
    )
    toast.success('Update Storage Success !!', {
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
    console.log('Error in updateStorage:', error)
    toast.error('Failed to update Storage', {
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

import axios from 'axios'
import { pathPhonesAPI } from '../api'
import { Bounce, toast } from 'react-toastify'

export const updatePhone = async (id: string, phoneName: string) => {
  try {
    const response = await axios.put(`${pathPhonesAPI}/phones/phone/update?id=${id}`, {
      phoneName,
    })
    toast.success('Update Phone Success !!', {
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
    console.log('Error in updatePhone:', error)
    toast.error('Failed to update Phone', {
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

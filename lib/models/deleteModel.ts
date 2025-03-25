import axios from 'axios'
import { pathModelsAPI } from '../api'
import Swal from 'sweetalert2'

export const deleteModel = async (id: string) => {
  try {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this item',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire('Deleted!', 'Your item has been deleted.', 'success')
        const response = await axios.put(`${pathModelsAPI}/models/model/delete?id=${id}`, { withCredentials: true })
        setTimeout(() => {
          window.location.reload()
        }, 1000)
        return response.data
      }
    })
  } catch (error) {
    console.log('Error in deleteModel:', error)
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
    })
    return []
  }
}

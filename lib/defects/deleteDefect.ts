import axios from 'axios'
import { pathDefectsAPI } from '../api'
import Swal from 'sweetalert2'

export const deleteDefect = async (id: string) => {
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
        const response = await axios.patch(`${pathDefectsAPI}/defects/defect/delete?id=${id}`, {
          withCredentials: true,
        })
        return response.data
      }
    })
  } catch (error) {
    console.error('Error in deleteDefect:', error)
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
    })
    return []
  }
}

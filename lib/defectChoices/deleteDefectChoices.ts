import axios from 'axios'
import { pathDefectsAPI } from '../api'
import Swal from 'sweetalert2'

export const deleteDefectChoices = async (id: string) => {
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
        const response = await axios.patch(`${pathDefectsAPI}/defect-choices/defect-choice/delete?id=${id}`, {
          withCredentials: true,
        })
        return response.data
      }
    })
  } catch (error : unknown) {
    console.error('Error in deleteDefectChoices:', error)
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
    })
    return []
  }
}

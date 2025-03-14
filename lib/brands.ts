import axios from 'axios'
import { pathBrandsAPI } from './api'
import { Bounce, toast } from 'react-toastify'
import Swal from 'sweetalert2'

export const fetchBrands = async () => {
  try {
    const response = await axios.get(`${pathBrandsAPI}/brands/brands`)
    return response.data
  } catch (error) {
    console.error('Failed to fetch Brands', error)
    return []
  }
}

export const fetchBrand = async (id: string) => {
  try {
    const response = await axios.get(`${pathBrandsAPI}/brands/brand/${id}`)
    return response.data
  } catch (error) {
    console.error('Failed to fetch Brand', error)
    return []
  }
}

export const updateBrand = async (id: string, brandName: string) => {
  try {
    const response = await axios.put(`${pathBrandsAPI}/brands/brand/${id}`, {
      brandName,
    })
    toast.success('Logined Success !!', {
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
    console.log(error)
    toast.error('Failed to update Brand', {
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
export const deleteBrand = async (id: string) => {
  try {
    const response = await axios.put(`${pathBrandsAPI}/brands/brand/delete/${id}`)
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this item',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Deleted!', 'Your item has been deleted.', 'success')
        return response.data
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Your item is safe :)', 'error')
      }
    })
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
    })
    return []
  }
}
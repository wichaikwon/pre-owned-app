import axios from 'axios'
import { pathAPI, pathBrandsAPI } from './api'
import { Bounce, toast } from 'react-toastify'
import Swal from 'sweetalert2'
import { redirect } from 'next/dist/server/api-utils'

export const fetchBrands = async () => {
  try {
    const response = await axios.get(`${pathAPI}/brands/brands`, { withCredentials: true })
    return response.data
  } catch (error) {
    console.error('Failed to fetch Brands', error)
    return []
  }
}

export const fetchBrand = async (id: string) => {
  try {
    const response = await axios.get(`${pathAPI}/brands/brand?id=${id}`, { withCredentials: true })
    return response.data
  } catch (error) {
    console.error('Failed to fetch Brand', error)
    return []
  }
}

export const updateBrand = async (id: string, brandName: string) => {
  
  try {
    const response = await axios.put(
      `${pathBrandsAPI}/brands/brand/update?id=${id}`,
      {
        brandName,
      },
      { withCredentials: true }
    )
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
        const response = await axios.put(`${pathBrandsAPI}/brands/brand/delete?id=${id}`, { withCredentials: true })
        setTimeout(() => {
          window.location.reload()
        }, 1000)
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

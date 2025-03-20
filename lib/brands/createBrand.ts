import axios from "axios"
import { pathBrandsAPI } from "../api"
import { Bounce, toast } from "react-toastify"

export const createBrand = async (brandCode: string, brandName: string) => {
  try {
    const response = await axios.post(`${pathBrandsAPI}/brands/brands/create`, [
      {
        brandCode: brandCode,
        brandName: brandName,
      }
    ])
    console.log(brandCode, brandName, response.data)  
    if (response.data.success) {
      toast.success('Brand created successfully!', {
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
      toast.error(response.data.error || 'brandCode already exists', {
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
  } catch (error: any) {
    const errorMessage = error.response?.data?.error || error.message || 'An unexpected error occurred.';
    toast.error(errorMessage, {
      position: 'bottom-right',
      autoClose: 2000,
      hideProgressBar: false,
      pauseOnHover: true,
      draggable: true,
      theme: 'colored',
      transition: Bounce,
    });
    return { success: false, error: errorMessage };
  }
}

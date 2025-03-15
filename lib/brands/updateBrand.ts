import { Bounce, toast } from "react-toastify"
import { pathBrandsAPI } from "../api"
import axios from "axios"

export const updateBrand = async (id: string, brandName: string) => {
  
    try {
      const response = await axios.put(
        `${pathBrandsAPI}/brands/brand/update?id=${id}`,
        {
          brandName,
        },
        { withCredentials: true }
      )
      toast.success('Update Brand Success !!', {
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
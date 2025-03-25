import { pathLoginAPI } from '@/lib/api'
import axios from 'axios'
import { Bounce, toast } from 'react-toastify'
import Swal from 'sweetalert2'

export const loginAction = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${pathLoginAPI}/auth/login`, { username, password })
    const token = response.data?.token
    if (!token) {
      throw new Error('Token not found in API response')
    }
    document.cookie = `token=${token}; path=/; max-age=3600;`
    toast.success('Logined Success !!', {
      position: 'bottom-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      theme: 'colored',
      transition: Bounce,
    })
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Login Failed',
      text: axios.isAxiosError(error) && error.response?.data?.error
        ? error.response.data.error
        : 'Invalid username or password',
    })
  }
}
export const logoutAction = async () => {
  try {
    await axios.post(`${pathLoginAPI}/auth/logout`)
  } catch (error: unknown) {
    const errorMessage = axios.isAxiosError(error) && error.response?.data?.error
      ? error.response.data.error
      : `Can't Logout`;
    toast.error(errorMessage, {
      position: 'bottom-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      theme: 'colored',
      transition: Bounce,
    })
  }
}

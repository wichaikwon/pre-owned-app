import { pathAPI } from '@/lib/api'
import api from '@/lib/token'
import Swal from 'sweetalert2'
export const loginAction = async (username: string, password: string) => {
  try {
    const response = await api.post(
      `${pathAPI}/auth/login`,
      {
        username,
        password,
      },
      { withCredentials: true }
    )
    const token = response.data?.token
    if (!token) {
      throw new Error('Token not found in API response')
    }
    document.cookie = `token=${token}; path=/; max-age=3600;` 
    Swal.fire({
      icon: 'success',
      title: 'Login Successful',
      text: 'Welcome back!',
    })
    return token
  } catch (error: any) {
    console.error('Login failed:', error) 
    Swal.fire({
      icon: 'error',
      title: 'Login Failed',
      text: error.response?.data?.error || 'Invalid username or password',
    })
    throw error 
  }
}
export const refreshTokenAction = async () => {
  try {
    const response = await api.post(`${pathAPI}/auth/refresh`, {}, { withCredentials: true })
    return response.data.token
  } catch (error: any) {
    Swal.fire({
      icon: 'error',
      title: 'Login Failed',
      text: error.response?.data?.error || 'Invalid username or password',
    })
  }
}
export const logoutAction = async () => {
  try {
    await api.post(`${pathAPI}/auth/logout`, {}, { withCredentials: true })
    Swal.fire({
      icon: 'success',
      title: 'Logout Succesful',
      text: 'Goodbye',
    })
  } catch (error: any) {
    Swal.fire({
      icon: 'error',
      title: 'Logout Failed',
      text: error.response?.data?.error || 'Invalid username or password',
    })
  }
}

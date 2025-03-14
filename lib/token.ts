import axios from 'axios'
import { pathAPI } from '@/lib/api'
import { refreshTokenAction } from '@/app/admin/login/action'

const api = axios.create({
  baseURL: pathAPI,
  withCredentials: true, // Include cookies in requests
})

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      try {
        await refreshTokenAction() 
        const token = document.cookie
          .split('; ')
          .find((row) => row.startsWith('token='))
          ?.split('=')[1] ?? ''
        console.log('Token after refresh:', token) 
        if (token) {
          originalRequest.headers['Authorization'] = `Bearer ${token}`
        }
        return api(originalRequest) 
      } catch (err) {
        console.error('Failed to refresh token', err)
        return Promise.reject(err)
      }
    }
    return Promise.reject(error)
  }
)

export default api
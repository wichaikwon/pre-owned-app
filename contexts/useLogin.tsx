'use client'

import { loginAction, logoutAction } from '@/app/admin/login/action'
import { useRouter } from 'next/navigation'
import { createContext, ReactNode, useContext, useState, useEffect } from 'react'

interface LoginContextProps {
  token: string
  username: string
  loginUser: (username: string, password: string) => Promise<void>
  logoutUser: () => void
}

const LoginContext = createContext<LoginContextProps>({
  token: '',
  username: '',
  loginUser: async () => {},
  logoutUser: () => {},
})

export const LoginProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string>('')
  const [username, setUsername] = useState<string>('')
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = document.cookie
        .split('; ')
        .find((row) => row.startsWith('token='))
        ?.split('=')[1] ?? ''
      setToken(token)
    }
  }, [])

  const loginUser = async (username: string, password: string) => {
    try {
      const token = await loginAction(username, password)
      setToken(token || '')
      setUsername(username)
      router.push('/admin')
    } catch (error) {
      console.error('Login failed in useLogin:', error) 
    }
  }

  const logoutUser = async () => {
    try {
      await logoutAction()
      document.cookie = `token=; path=/; max-age=0;` 
      setToken('')
      setUsername('')
      router.push('/admin/login')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <LoginContext.Provider value={{ token, username, loginUser, logoutUser }}>
      {children}
    </LoginContext.Provider>
  )
}

export const useLogin = () => {
  const context = useContext(LoginContext)
  if (!context) {
    throw new Error('useLogin must be used within a LoginProvider')
  }
  return context
}
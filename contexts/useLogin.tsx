'use client'

import { loginAction, logoutAction } from '@/lib/auth/loggin'
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
      const storedUsername = localStorage.getItem('username')
      storedUsername && setUsername(storedUsername)
    }
  }, [])

  const loginUser = async (username: string, password: string) => {
    try {
      await loginAction(username, password)
      const token = document.cookie
        .split('; ')
        .find((row) => row.startsWith('token='))
        ?.split('=')[1] ?? ''
      setToken(token)
      setUsername(username)
      localStorage.setItem('username', username)
      router.push('/admin')
    } catch (error) {
      console.log(error)
    }
  }

  const logoutUser = async () => {
    try {
      await logoutAction()
      document.cookie = `token=; path=/; max-age=0;` 
      setToken('')
      localStorage.removeItem('username')
      router.push('/admin/login')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <LoginContext.Provider value={{ token,username, loginUser, logoutUser }}>
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

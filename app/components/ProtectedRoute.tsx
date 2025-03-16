'use client'
import { useLogin } from '@/contexts/useLogin'
import { useRouter } from 'next/navigation'
import React, { useEffect, ReactNode } from 'react'

interface ProtectedRouteProps {
  children: ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { token } = useLogin()
  const router = useRouter()

  useEffect(() => {
    if (!token) {
      router.push('/admin/login')
    }
  }, [token, router])

  if (!token) {
    return <p>Loading...</p>
  }

  return <>{children}</>
}

export default ProtectedRoute
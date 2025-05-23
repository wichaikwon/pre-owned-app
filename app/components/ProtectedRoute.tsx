'use client'
import { useLogin } from '@/contexts/useLogin'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, ReactNode } from 'react'

interface ProtectedRouteProps {
  children: ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const path = usePathname()
  const { token } = useLogin()
  const router = useRouter()

  useEffect(() => {
    if (!token) {
      router.push('/admin/login')
    } else {
      router.push(path)
    }
  }, [token, router, path])

  if (!token) {
    return <p>Loading...</p>
  }

  return <>{children}</>
}

export default ProtectedRoute
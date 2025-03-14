'use client'
import { useLogin } from '@/contexts/useLogin'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const Dashboard: React.FC = () => {
  const { token } = useLogin()
  const router = useRouter()

  useEffect(() => {
    if (!token) {
      console.log('No token found, redirecting to login') // Debugging log
      router.push('/admin/login')
    }
  }, [token, router])

  return (
    <div>
      <p>Dashboard</p>
    </div>
  )
}

export default Dashboard
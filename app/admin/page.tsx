'use client'
import { useLogin } from '@/contexts/useLogin'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Dashboard: React.FC = () => {
  const { token } = useLogin()
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!token) {
      router.push('/admin/login')
    } else {
      setLoading(false)
    }
  }, [token, router])

  if (loading) {
    return <p>Loading...</p>
  }

  return (
    <div>
      <p>Dashboard</p>
    </div>
  )
}

export default Dashboard
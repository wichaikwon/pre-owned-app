'use client'
import React, { useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useLogin } from '../../../contexts/useLogin'
import { useRouter } from 'next/navigation'

type LoginFormInputs = {
  username: string
  password: string
}

const Admin: React.FC = () => {
  const { register, handleSubmit } = useForm<LoginFormInputs>()
  const { loginUser } = useLogin()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    setLoading(true)
    await loginUser(data.username, data.password)
    setLoading(false)
  }

  useEffect(() => {
    const token = document.cookie
      .split('; ')
      .find((row) => row.startsWith('token='))
      ?.split('=')[1]
    if (token) {
      router.push('/admin')
    }
  }, [router])

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100">
      <div className="flex w-80 flex-col gap-4 rounded-md border bg-white p-4">
        <p className="flex w-full justify-center text-4xl">Admin</p>
        <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
          <p>Username</p>
          <input
            className="rounded-md border border-slate-500 p-2"
            placeholder="username"
            type="text"
            {...register('username', { required: true })}
          />
          <p>Password</p>
          <input
            className="rounded-md border border-slate-500 p-2"
            placeholder="password"
            type="password"
            {...register('password', { required: true })}
          />
          <button className="rounded-md bg-green-500 p-2 text-white" type="submit">
            {loading ? 'Loading...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Admin

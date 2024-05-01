import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'
import { Link, useNavigate } from 'react-router-dom'

import * as apiClient from '../api-client'
import useAppContext from '../hooks/useAppContext'
import { ToastType } from '../enums/ToastType'
import SubmitButton from '../components/SubmitButton'

export type SignInFormData = {
  email: string
  password: string
}

const SignIn = () => {
  const { showToast } = useAppContext()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>()

  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const mutation = useMutation(apiClient.signIn, {
    onSuccess: async () => {
      showToast({ message: 'Sign in Successful!', type: ToastType.SUCCESS })
      await queryClient.invalidateQueries('validateToken')
      navigate('/')
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: ToastType.ERROR })
    },
  })

  const onSubmit = handleSubmit(data => {
    mutation.mutate(data)
  })

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      <h2 className="text-3xl font-bold">Sign In</h2>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Email
        <input
          type="email"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register('email', { required: 'Email is required' })}
        />
        {errors.email && (
          <span className="text-red-600">{errors.email.message}</span>
        )}
      </label>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Password
        <input
          type="password"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters',
            },
          })}
        />
        {errors.password && (
          <span className="text-red-600">{errors.password.message}</span>
        )}
      </label>
      <span className="flex items-center justify-between">
        <span className="text-sm">
          Not Registered?{' '}
          <Link className="underline" to="/register">
            Create an account here
          </Link>
        </span>
        <SubmitButton text="Login" />
        {/* <button
          type="submit"
          className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-lg">
          Login
        </button> */}
      </span>
    </form>
  )
}

export default SignIn

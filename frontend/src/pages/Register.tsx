import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'
import { Link, useNavigate } from 'react-router-dom'

import useAppContext from '../hooks/useAppContext'
import { ToastType } from '../enums/ToastType'
import * as apiClient from '../api-client'
import SubmitButton from '../components/SubmitButton'

export type RegisterFormData = {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
}

const Register = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { showToast } = useAppContext()
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>()

  const mutation = useMutation(apiClient.register, {
    onSuccess: () => {
      showToast({ message: 'Registration Success!', type: ToastType.SUCCESS })
      queryClient.invalidateQueries('validateToken')
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
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-3xl font-bold">Create an account</h1>
      <div className="flex flex-col md:flex-row gap-5">
        <label className="text-gray-700 text-sm font-bold flex-1">
          First Name
          <input
            type="text"
            className="border rounded w-full py-1 px-2 font-normal"
            {...register('firstName', { required: 'First name is required' })}
          />
          {errors.firstName && (
            <span className="text-red-600">{errors.firstName.message}</span>
          )}
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Last Name
          <input
            type="text"
            className="border rounded w-full py-1 px-2 font-normal"
            {...register('lastName', { required: 'Last name is required' })}
          />
          {errors.lastName && (
            <span className="text-red-600">{errors.lastName.message}</span>
          )}
        </label>
      </div>
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
      <label className="text-gray-700 text-sm font-bold flex-1">
        Confirm Password
        <input
          type="password"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register('confirmPassword', {
            validate: val => {
              if (!val) {
                return 'Confirm password is required'
              }
              if (val !== watch('password')) {
                return 'Passwords do not match'
              }
            },
          })}
        />
        {errors.confirmPassword && (
          <span className="text-red-600">{errors.confirmPassword.message}</span>
        )}
      </label>
      <span className="flex items-center justify-between">
        <span className="text-sm">
          Have an account?{' '}
          <Link className="underline" to="/sign-in">
            Sign In
          </Link>
        </span>
        <SubmitButton text="Create Account" />
        {/* <button
          type="submit"
          className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-lg">
          Create Account
        </button> */}
      </span>
    </form>
  )
}

export default Register

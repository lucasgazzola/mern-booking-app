import { RegisterFormData } from './pages/Register'
import { SignInFormData } from './pages/SingIn'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const register = async (formData: RegisterFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/users/register`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })
  const responseBody = await response.json()

  //TODO: MEJORAR ESTE MANEJO DE ERRORES
  // LA RESPUESTA PUEDE SER UN ARRAY DE ERORRES POR EL EXPRESS-VALIDATOR

  if (Array.isArray(responseBody.message)) {
    console.log('first')
    console.log(responseBody.message[0].msg)
    throw new Error(responseBody.message[0].msg)
  }
  if (!response.ok) {
    throw new Error(responseBody.message)
  }
}

export const validateToken = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
    credentials: 'include',
  })

  if (!response.ok) {
    throw new Error('Invalid token')
  }

  return response.json()
}

export const signIn = async (formData: SignInFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })
  //TODO: MEJORAR ESTE MANEJO DE ERRORES
  // LA RESPUESTA PUEDE SER UN ARRAY DE ERORRES POR EL EXPRESS-VALIDATOR
  const body = await response.json()
  if (!response.ok) {
    throw new Error(body.message)
  }
}

export const signOut = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
    method: 'POST',
    credentials: 'include',
  })
  if (!response.ok) {
    throw new Error('Failed to sign out')
  }
}

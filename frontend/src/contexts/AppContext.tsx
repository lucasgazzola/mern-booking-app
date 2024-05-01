import { createContext, useState } from 'react'
import { useQuery } from 'react-query'

import Toast from '../components/Toast'
import * as apiClient from '../api-client'
import { type ToastType } from '../enums/ToastType'

type ToastMessage = {
  message: string
  type: ToastType
}

export type AppContext = {
  showToast: (toastMessage: ToastMessage) => void
  isLoggedIn: boolean
}

export const AppContext = createContext<AppContext | null>(null)

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [toast, setToast] = useState<ToastMessage | null>(null)

  const { isError } = useQuery('validateToken', apiClient.validateToken, {
    retry: false,
  })

  return (
    <AppContext.Provider
      value={{
        showToast: toastMessage => {
          setToast(toastMessage)
        },
        isLoggedIn: !isError,
      }}>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => {
            setToast(null)
          }}
        />
      )}
      {children}
    </AppContext.Provider>
  )
}

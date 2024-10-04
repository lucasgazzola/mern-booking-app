import { useMutation } from 'react-query'
import ManageHotelForm from '../forms/ManageHotelForm/ManageHotelForm'
import { ToastType } from '../enums/ToastType'
import useAppContext from '../hooks/useAppContext'
import * as apiClient from '../api-client'

const AddHotel = () => {
  const { showToast } = useAppContext()
  const { mutate, isLoading } = useMutation(apiClient.addMyHotel, {
    onSuccess: () => {
      showToast({ message: 'Hotel Saved!', type: ToastType.SUCCESS })
    },
    onError: () => {
      showToast({ message: 'Error saving hotel!', type: ToastType.ERROR })
    },
  })

  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData)
  }
  return <ManageHotelForm onSave={handleSave} isLoading={isLoading} />
}
export default AddHotel

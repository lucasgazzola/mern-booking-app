import { FormProvider, useForm } from 'react-hook-form'

import DetailsSection from './DetailsSection'
import TypeSection from './TypeSection'
import FacilitiesSection from './FacilitiesSection'
import GuestSection from './GuestSection'
import ImagesSection from './ImagesSection'

export type HotelFormData = {
  name: string
  city: string
  country: string
  description: string
  type: string
  pricePerNight: number
  starsRating: number
  facilities: string[]
  imageFiles: FileList
  adultCount: number
  childCount: number
}

type Props = {
  onSave: (hotelFormData: FormData) => void
  isLoading: boolean
}

const ManageHotelForm = ({ onSave, isLoading }: Props) => {
  const formMethods = useForm<HotelFormData>()
  const { handleSubmit } = formMethods

  const onSubmit = handleSubmit((formDataJson: HotelFormData) => {
    // Create new formData object

    const formData = new FormData()

    // Append data to formData object
    formData.append('name', formDataJson.name)
    formData.append('city', formDataJson.city)
    formData.append('country', formDataJson.country)
    formData.append('description', formDataJson.description)
    formData.append('type', formDataJson.type)
    formData.append('pricePerNight', formDataJson.pricePerNight.toString())
    formData.append('starsRating', formDataJson.starsRating.toString())
    formData.append('adultCount', formDataJson.adultCount.toString())
    formData.append('childCount', formDataJson.childCount.toString())

    formDataJson.facilities.forEach((facility, index) => {
      formData.append(`facilities[${index}]`, facility)
    })

    Array.from(formDataJson.imageFiles).forEach(imageFile => {
      formData.append(`imageFiles`, imageFile)
    })

    onSave(formData)
  })

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={onSubmit} className="flex flex-col gap-10">
        <DetailsSection />
        <TypeSection />
        <FacilitiesSection />
        <GuestSection />
        <ImagesSection />
        <span className="flex justify-end">
          <button
            disabled={isLoading}
            className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl disabled:bg-gray-500"
            type="submit">
            {isLoading ? 'Saving...' : 'Save'}
          </button>
        </span>
      </form>
    </FormProvider>
  )
}

export default ManageHotelForm

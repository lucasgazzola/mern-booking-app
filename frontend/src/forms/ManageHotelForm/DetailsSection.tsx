import { useFormContext } from 'react-hook-form'

import { HotelFormData } from './ManageHotelForm'

const DetailsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>()
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold mb-3">Add Hotel</h1>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Name
        <input
          type="text"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register('name', { required: 'Name is required' })}
        />
        {errors.name && (
          <span className="text-red-600">{errors.name.message}</span>
        )}
      </label>
      <div className="flex gap-4">
        <label className="text-gray-700 text-sm font-bold flex-1">
          City
          <input
            type="text"
            className="border rounded w-full py-1 px-2 font-normal"
            {...register('city', { required: 'City is required' })}
          />
          {errors.city && (
            <span className="text-red-600">{errors.city.message}</span>
          )}
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Country
          <input
            type="text"
            className="border rounded w-full py-1 px-2 font-normal"
            {...register('country', { required: 'Country is required' })}
          />
          {errors.country && (
            <span className="text-red-600">{errors.country.message}</span>
          )}
        </label>
      </div>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Description
        <textarea
          rows={10}
          className="border rounded w-full py-1 px-2 font-normal"
          {...register('description', { required: 'Name is required' })}
        />
        {errors.description && (
          <span className="text-red-600">{errors.description.message}</span>
        )}
      </label>
      <label className="text-gray-700 text-sm font-bold max-w-[50%]">
        Price per nigth
        <input
          type="number"
          min={1}
          className="border rounded w-full py-1 px-2 font-normal"
          {...register('pricePerNight', { required: 'Name is required' })}
        />
        {errors.pricePerNight && (
          <span className="text-red-600">{errors.pricePerNight.message}</span>
        )}
      </label>
      <label className="text-gray-700 text-sm font-bold max-w-[50%]">
        Stars rating
        <select
          {...register('starsRating', {
            required: 'Stars rating is required',
          })}
          className="border rounded w-full p-2 text-gray-700 font-normal">
          <option value="" className="text-sm font-bold">
            Select as Rating
          </option>
          {[1, 2, 3, 4, 5].map(stars => (
            <option key={stars} value={stars}>
              {stars}
            </option>
          ))}
        </select>
        {errors.starsRating && (
          <span className="text-red-600">{errors.starsRating.message}</span>
        )}
      </label>
    </div>
  )
}

export default DetailsSection

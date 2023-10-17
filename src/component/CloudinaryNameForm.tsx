import React, { useState } from 'react'
import { toast } from 'sonner'

interface FormProps {
  onSubmit: (e: string) => void
}
export const CloudinaryNameForm: React.FC<FormProps> = ({ onSubmit }) => {
  const [isError, setIsError] = useState(false)
  const handleSubmit = (e: any) => {
    e.preventDefault()
    const value = e.target.cloudinaryName.value
    setIsError(false)
    if (value.length > 0) {
      onSubmit(value)
    } else {
      toast.error('Please enter a valid cloudinary name')
      setIsError(true)
    }
  }
  return (
    <form onSubmit={handleSubmit} method='post'>
      <label
        htmlFor='search'
        className='mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white'
      >
        Enter a Cloudinary name
      </label>
      <div className='relative'>
        <input
          type='string'
          id='cloudinaryName'
          name='cloudinaryName'
          className={
            !isError
              ? 'block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              : 'block w-full p-4 pl-10 text-sm bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500'
          }
          placeholder='Cloudinary name'
          required
        />
        <button
          type='submit'
          className={
            !isError
              ? 'text-white absolute flex items-center gap-1 right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled'
              : 'text-white absolute flex items-center gap-1 right-2.5 bottom-2.5 bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 disabled'
          }
        >
          Save
        </button>
      </div>
    </form>
  )
}

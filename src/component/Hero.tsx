import { useState } from 'react'
import { BadgeName } from './BadgeName'
import { CloudinaryNameForm } from './CloudinaryNameForm'
import { Form } from './Form'
import { Loading } from './Loading'
import { CloudinaryIcon } from './icons/cloudinary'

interface HeroProps {
  onSubmit?: (e: any) => void
}

export const Hero = ({ onSubmit }: HeroProps) => {
  const pagesUrl = '/api/pages'
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [cloudinaryName, setCloudinaryName] = useState<string>('')

  const handleCloudinaryName = (name: string) => {
    setCloudinaryName(name)
  }
  const handleSubmit = async (event: any) => {
    event.preventDefault()
    const url = event.target.url.value
    setIsLoading(true)
    const test = await fetch(pagesUrl, {
      method: 'POST',
      body: JSON.stringify({ url, cloudinaryName })
    })
      .then(async (res) => await res.json())
      .catch(() => {
        setIsLoading(false)
      })
    setIsLoading(false)
    onSubmit && onSubmit(test)
  }
  return (
    <>
      <div className='mx-auto max-w-6xl mt-24 mb-12 flex justify-center'>
        <div className='text-center max-w-4xl'>
          <h1 className='text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl'>
            <span className={'text-blue-700'}>Optimize</span> the size of your
            website images
          </h1>
          {!cloudinaryName && (
            <>
              <p className='mt-6 text-2xl leading-8 text-gray-600'>
                Introduce your cloudinary name to get started
              </p>
              <div className='mt-24'>
                <CloudinaryNameForm onSubmit={handleCloudinaryName} />
              </div>
            </>
          )}
          {cloudinaryName && (
            <>
              <p className='mt-6 text-xl leading-8 text-gray-600'>
                Introduce your website URL and see how you can improve your
                images
              </p>
              <div className='mt-24'>
                <Form isLoading={isLoading} onSubmit={handleSubmit} />
              </div>
            </>
          )}
          <p className='mt-2 text-xs leading-8 text-gray-600 flex justify-center items-center gap-2'>
            Optimized with <CloudinaryIcon />
            {cloudinaryName && (
              <>
                for user{' '}
                <BadgeName
                  name={cloudinaryName}
                  onClickRemove={() => {
                    setCloudinaryName('')
                  }}
                />
              </>
            )}
          </p>
        </div>
      </div>

      {isLoading && (
        <div className='w-full flex justify-center'>
          <Loading className={'w-12'} />
        </div>
      )}
    </>
  )
}

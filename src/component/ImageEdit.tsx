import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { Loading } from './Loading'

interface ImageEditProps {
  src: string
  cloudinarySrc: string
  onChange: (bytes: number) => void
}
export const ImageEdit: React.FC<ImageEditProps> = ({
  src,
  cloudinarySrc,
  onChange
}) => {
  const [imgLoading, setImgLoading] = useState<boolean>(true)
  const [imgLoading2, setImgLoading2] = useState<boolean>(true)
  const handleErrorLoadingImage = () => {
    console.log('error loading image')
    toast.error(
      'Error loading image, looks like the cloudinary name is not valid'
    )
  }
  const observer = new PerformanceObserver((list, observer) => {
    list.getEntriesByName(cloudinarySrc).forEach((entry: any) => {
      if (entry.decodedBodySize) {
        onChange && onChange(entry.decodedBodySize)
        observer.disconnect()
      }
    })
  })

  observer.observe({ entryTypes: ['resource'] })

  useEffect(() => {
    import('two-up-element')
  }, [])

  return (
    <div>
      <two-up class='flex-1' style={{ height: '350px' }}>
        <div
          className='text-center flex justify-center'
          style={{ height: 'inherit' }}
        >
          {imgLoading && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-start'
                // alignItems: 'center'
              }}
            >
              <Loading className='w-16' />
            </div>
          )}
          <img
            className={'object-contain'}
            src={src}
            loading='lazy'
            width={350}
            height={350}
            onLoad={() => {
              setImgLoading(false)
            }}
            style={{ objectFit: 'contain' }}
            alt='Imagen original subida por el usuario'
          />
        </div>
        <div
          className='text-center flex justify-center'
          style={{ height: 'inherit' }}
        >
          {imgLoading2 && (
            <div
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'flex-end'
                // alignItems: 'center'
              }}
            >
              <Loading className='w-16' />
            </div>
          )}
          <img
            className={'object-contain'}
            src={cloudinarySrc}
            loading='lazy'
            width={350}
            height={350}
            onLoad={() => {
              setImgLoading2(false)
            }}
            onError={handleErrorLoadingImage}
            style={{ objectFit: 'contain' }}
            alt='Imagen sin fondo subida por el usuario'
          />
        </div>
      </two-up>
    </div>
  )
}

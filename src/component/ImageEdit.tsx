import { cloudyUrl } from '@/utils/utils'
import { useEffect } from 'react'

interface ImageEditProps {
  src: string
}
export const ImageEdit: React.FC<ImageEditProps> = ({ src }) => {
  const cloudinarySrc = cloudyUrl(src)
  useEffect(() => {
    import('two-up-element')
  }, [])

  const observer = new PerformanceObserver((list, observer) => {
    list.getEntriesByName(cloudinarySrc).forEach((entry) => {
      if (entry.decodedBodySize) {
        console.log('decodedBodySize', entry.decodedBodySize)
        observer.disconnect()
      }
    })
  })

  observer.observe({ entryTypes: ['resource'] })

  return (
    <div>
      <two-up class="flex-1" style={{ height: '350px' }}>
        <div
          className="text-center flex justify-center"
          style={{ height: 'inherit' }}
        >
          <img
            className={'object-contain'}
            src={src}
            alt="Imagen original subida por el usuario"
            style={
              {
                // height: '100%',
                // width: '100%',
                // margin: '0 auto',
                // objectFit: 'contain'
              }
            }
          />
        </div>
        <div
          className="text-center flex justify-center"
          style={{ height: 'inherit' }}
        >
          <img
            className={'object-contain'}
            src={cloudinarySrc}
            alt="Imagen sin fondo subida por el usuario"
            style={
              {
                // height: '100%'
                // width: '100%',
                // margin: '0 auto',
                // objectFit: 'contain'
              }
            }
          />
        </div>
      </two-up>
    </div>
  )
}

import { useEffect } from 'react'

interface ImageEditProps {
  src: string
  cloudinarySrc: string
}
export const ImageEdit: React.FC<ImageEditProps> = ({ src, cloudinarySrc }) => {
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
          />
        </div>
      </two-up>
    </div>
  )
}

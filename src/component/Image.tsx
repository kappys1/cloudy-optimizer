import { useRef, useState } from 'react'

export interface ImageProps {
  src: string
  alt: string
  height?: number
  width?: number
  className?: string
  onClick?: () => void
}

export const Image = ({ src, alt, height, width, className }: ImageProps) => {
  const ref = useRef<HTMLImageElement>(null)
  const [show, setShow] = useState(false)
  const handleClick = () => {
    setShow(!show)
  }
  const staticWidth = {
    width,
    height
  }
  return (
    <>
      <div style={{ color: 'white' }}>{show ? 'show' : 'not show'}</div>
      <div className='w-[300px] h-[100px] relative'>
        <img
          src={src}
          alt={alt}
          ref={ref}

          {...(height && width ? staticWidth : {})}
          onClick={handleClick}
          className={`${className} h-full object-contain`}
        />
      </div>
    </>
  )
}

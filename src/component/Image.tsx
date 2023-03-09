import NextImage from 'next/image'
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
      <div style={{ width: '300px', height: '100px', position: 'relative' }}>
        <NextImage
          src={src}
          alt={alt}
          ref={ref}
          {...(height && width ? staticWidth : {})}
          fill={!(height && width)}
          style={{ objectFit: 'contain' }}
          onClick={handleClick}
          className={className}
        />
      </div>
    </>
  )
}

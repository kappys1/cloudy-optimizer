import JSZip from 'jszip'

export const ENV = {
  CLOUDINARY_NAME: process.env.NEXT_PUBLIC_CLOUDINARY_NAME
}

export const isValidUrl = (string: string) => {
  try {
    // eslint-disable-next-line no-new
    new URL(string)
    return true
  } catch (err) {
    return false
  }
}
interface CloudinaryOptions {
  quality?: number | string
}
export const cloudyUrl = (
  src: string,
  options: CloudinaryOptions = { quality: 'auto' }
) =>
  `https://res.cloudinary.com/${ENV.CLOUDINARY_NAME}/image/fetch/f_auto,q_${options.quality}/${src}`

export const getNameFromUrl = (url: string = '') => {
  const regex = /[^/]*$/.exec(url)
  return (regex && regex[0]) || ''
}

export const downloadImage = async (imageSrc: string) => {
  const image = await fetch(imageSrc, {
    method: 'GET',
    headers: {
      accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8'
    }
  })
  const imageBlog = await image.blob()
  const imageURL = URL.createObjectURL(imageBlog)
  const name = getNameFromUrl(imageSrc)
  const link = document.createElement('a')
  link.href = imageURL
  link.download = name.split('.')[0] || 'image'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export const downloadImageAsZip = async (urls: string[]) => {
  const imgPromises = urls.map((src) => fetch(src))
  const images = await Promise.allSettled(imgPromises)
  const zip = new JSZip()
  images
    .filter((i) => i.status === 'fulfilled')
    .forEach((d: any, i) => {
      const name = getNameFromUrl(urls[i])
      zip?.file(name, d.value?.blob())
    })
  return await zip.generateAsync({ type: 'blob' })
}

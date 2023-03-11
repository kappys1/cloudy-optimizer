export const ENV = {
  CLOUDINARY_NAME: process.env.NEXT_PUBLIC_CLOUDINARY_NAME
}

export const fetcher = async (...args) =>
  await fetch(...args).then(async (res) => await res.json())

interface CloudinaryOptions {
  quality?: number | string
}
export const cloudyUrl = (
  src: string,
  options: CloudinaryOptions = { quality: 'auto' }
) =>
  `https://res.cloudinary.com/${ENV.CLOUDINARY_NAME}/image/fetch/f_auto,q_${options.quality}/${src}`

export const getNameFromUrl = (url: string) => /[^/]*$/.exec(url)[0] || ''

export const downloadImage = async (imageSrc: string) => {
  const image = await fetch(imageSrc)
  const imageBlog = await image.blob()
  const imageURL = URL.createObjectURL(imageBlog)
  const name = getNameFromUrl(imageSrc)
  const link = document.createElement('a')
  link.href = imageURL
  link.download = name || 'image'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

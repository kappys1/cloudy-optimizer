export const ENV = {
  CLOUDINARY_NAME: process.env.NEXT_PUBLIC_CLOUDINARY_NAME
}

export const fetcher = async (...args) =>
  await fetch(...args).then(async (res) => await res.json())

export const cloudyUrl = (src: string) =>
  `https://res.cloudinary.com/${ENV.CLOUDINARY_NAME}/image/fetch/f_auto,q_auto/${src}`

export async function downloadImage(imageSrc: string) {
  const image = await fetch(imageSrc)
  const imageBlog = await image.blob()
  const imageURL = URL.createObjectURL(imageBlog)
  const name = /[^/]*$/.exec(imageSrc)[0] || ''
  const link = document.createElement('a')
  link.href = imageURL
  link.download = name || 'image'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

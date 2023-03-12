import JSZip from 'jszip'

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

export const downloadImageAsZip = async (urls: string[]) => {
  const imgPromises = urls.map((src) => fetch(src))
  const images = await Promise.allSettled(imgPromises)
  const zip = new JSZip()
  images
    .filter((i) => i.status === 'fulfilled')
    .forEach((d, i) => {
      const name = getNameFromUrl(urls[i])
      zip?.file(name, d.value?.blob())
    })
  return await zip.generateAsync({ type: 'blob' })
}

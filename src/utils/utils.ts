export const ENV = {
  CLOUDINARY_NAME: process.env.NEXT_PUBLIC_CLOUDINARY_NAME
}

export const fetcher = async (...args) =>
  await fetch(...args).then(async (res) => await res.json())

export const cloudyUrl = (src: string) =>
  `https://res.cloudinary.com/${ENV.CLOUDINARY_NAME}/image/fetch/f_auto,q_auto/${src}`

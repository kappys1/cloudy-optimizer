import { cloudyUrl } from '@/utils/utils'
import * as cheerio from 'cheerio'

export interface DetailAsset {
  src: string
  size: number
  sizeOptimized: number
  optimization: number
}

export interface Response {
  totalSize: number
  totalOptimizedSize: number
  optimization: number
  detail: DetailAsset[]
}

export const getFileSize = async (url: string) => {
  const response = await fetch(url, { method: 'HEAD' })
  const size = response.headers.get('Content-Length')
  return size ? parseInt(size) : 0
}

export const isAbsolutePath = (url: string) =>
  url.indexOf('http://') === 0 || url.indexOf('https://') === 0

export const getAssetsOptimized = async (url: string) => {
  return await fetch(url)
    .then(async (r) => await r.text())
    .then(async (html) => {
      const $ = cheerio.load(html)
      const images: string[] = []
      $('img').map(async (_i, el) => {
        const src = el.attribs.src
        if (src && !src.includes(';base64')) {
          const source = isAbsolutePath(src) ? src : url + src
          images.push(source)
        }
      })

      $('source').map(async (i, el) => {
        const src = el.attribs['data-srcset']
        if (src && !src.includes(';base64')) {
          const source = isAbsolutePath(src) ? src : url + src
          images.push(source)
        }
      })
      const uniqueSources = [...new Set(images)]
      const originalAsset = await Promise.all(
        uniqueSources.map(async (src) => {
          const size = await getFileSize(src)
          const cloudySize = await getFileSize(cloudyUrl(src))
          const optimization = (1 - cloudySize / size) * 100
          return { src, size, sizeOptimized: cloudySize, optimization }
        })
      )
      const sumSize = originalAsset.reduce((acc, curr) => acc + curr.size, 0)
      const sumOptimizedSize = originalAsset.reduce(
        (acc, curr) =>
          acc +
          (curr.sizeOptimized < curr.size ? curr.sizeOptimized : curr.size),
        0
      )
      const optimization = (1 - sumOptimizedSize / sumSize) * 100
      return {
        totalSize: sumSize,
        totalOptimizedSize: sumOptimizedSize,
        optimization,
        detail: originalAsset
      }
    })
}

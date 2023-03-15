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
          if (isAbsolutePath(src)) {
            images.push(src)
            return src
          }
          if (src.indexOf('//') === 0) {
            const source = src.replace('//', 'https://')
            images.push(source)
            return source
          }
          images.push(url + src)
          return url + src
        }
      })

      $('source').map(async (i, el) => {
        const src = el.attribs['data-srcset']
        if (src && !src.includes(';base64')) {
          if (isAbsolutePath(src)) {
            images.push(src)
            return src
          }
          if (src.indexOf('//') === 0) {
            const source = src.replace('//', 'https://')
            images.push(source)
            return source
          }
          images.push(url + src)
          return url + src
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
      const optimization = (1 - sumOptimizedSize / sumSize) * 100 || 0
      return {
        totalSize: sumSize,
        totalOptimizedSize: sumOptimizedSize,
        optimization,
        detail: originalAsset
      }
    })
    .catch((e) => {
      return {
        totalSize: 0,
        totalOptimizedSize: 0,
        optimization: 0,
        detail: []
      }
    })
}

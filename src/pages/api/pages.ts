import { getAssetsOptimized } from '@/lib/getAssetsNode'
import type { NextApiRequest, NextApiResponse } from 'next'

const pagesHandler = (
  req: NextApiRequest,
  res: NextApiResponse<{ result: string[] }>
) => {
  const { method = '', body } = req
  const bodyParsed = JSON.parse(body)
  const methods: Record<string, () => void> = {
    POST: async () => {
      const result: any = await getAssetsOptimized(
        bodyParsed.url,
        bodyParsed.cloudinaryName
      ).catch((e) => {
        console.log(e)
      })
      res.status(200).json({ ...result })
    }
  }
  const fallback = () => {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${method} Not Allowed`)
  }
  method && methods[method] ? methods[method]() : fallback()
}

export default pagesHandler

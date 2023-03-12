import { downloadImageAsZip } from '@/utils/utils'
import type { NextApiRequest, NextApiResponse } from 'next'

const pagesHandler = (
  req: NextApiRequest,
  res: NextApiResponse<{ result: string[] }>
) => {
  const { method = '', body } = req
  const bodyParsed = JSON.parse(body)
  const methods: Record<string, () => void> = {
    POST: async () => {
      const zip: any = await downloadImageAsZip(bodyParsed.urls).catch((e) => {
        console.log(e)
      })
      res.setHeader('Content-Disposition', 'attachment; filename="images.zip"')
      res.setHeader('Content-Type', 'application/zip')
      res.status(200).send(zip)
    }
  }
  const fallback = () => {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${method} Not Allowed`)
  }
  method && methods[method] ? methods[method]() : fallback()
}

export default pagesHandler

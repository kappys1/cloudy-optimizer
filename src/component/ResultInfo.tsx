import { type Response } from '@/lib/getAssetsNode'
import { useState } from 'react'
import { HomeDownloader } from './HomeDownloader'
import { ResultBanner } from './ResultBanner'

interface ResultInfoProps {
  data: Response | undefined
  onClickShowDetail: (show: boolean) => void
}
export const ResultInfo = ({ data, onClickShowDetail }: ResultInfoProps) => {
  const [showDetail, setShowDetail] = useState<boolean>(false)
  const handleShowDetail = () => {
    setShowDetail(!showDetail)
    onClickShowDetail && onClickShowDetail(!showDetail)
  }
  return (
    <>
      {data && (
        <>
          <ResultBanner
            optimization={data.optimization}
            size={data.totalSize}
            sizeOptimized={data.totalOptimizedSize}
          />
          <HomeDownloader urls={data.detail} />
          {data.detail.length > 0 && (
            <div
              className='text-center text-blue-500 cursor-pointer'
              onClick={handleShowDetail}
            >
              <p className='pb-8'>
                {showDetail ? 'Hide' : 'Show more '} details
              </p>
            </div>
          )}
        </>
      )}
    </>
  )
}

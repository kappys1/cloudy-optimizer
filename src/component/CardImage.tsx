import { useFormatBytes } from '@/hooks/useFormatBytes'
import { type DetailAsset } from '@/lib/getAssetsNode'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { Badge } from './Badge'
import { DownTrendIcon } from './icons/downTrend'
import { InfoIcon } from './icons/Info'
import { UpTrendIcon } from './icons/upTrend'
import { Image } from './Image'

interface CardImageProps {
  image: DetailAsset
  onClick?: () => void
}

export const CardImage: React.FC<CardImageProps> = ({ image, onClick }) => {
  const formatBytes = useFormatBytes()
  const { optimization } = image
  const [parent] = useAutoAnimate(/* optional config */)
  return (
    <div
      ref={parent}
      onClick={onClick && onClick}
      className="block rounded-lg p-4 shadow-sm shadow-indigo-300 w-80 cursor-pointer hover::cursor-pointer hover:shadow-md hover:shadow-indigo-400 hover:scale-105 transition duration-300 ease-in-out"
    >
      <Image
        alt="Home"
        src={image.src}
        className="h-56 w-full rounded-md object-cover"
      />

      <div className="mt-6 flex items-center gap-4 text-xs justify-between">
        <div className="w-full flex justify-between sm:shrink-0 sm:items-center sm:gap-5 mt-1.5">
          <InfoIcon color="text-indigo-700" />

          <div className="sm:mt-0">
            <p className="text-gray-500">Size</p>

            <p className="font-medium">{formatBytes(image.size)}</p>
          </div>
          <div className="sm:mt-0">
            <p className="text-gray-500">New size</p>

            <p className="font-medium">{formatBytes(image.sizeOptimized)}</p>
          </div>

          <div className="flex justify-end">
            <Badge
              color={optimization > 0 ? 'bg-green-600' : 'bg-red-600'}
              icon={optimization > 0 ? <UpTrendIcon /> : <DownTrendIcon />}
            >
              {optimization && `${+optimization.toFixed(2)}%`}
            </Badge>
          </div>
        </div>
      </div>
    </div>
  )
}

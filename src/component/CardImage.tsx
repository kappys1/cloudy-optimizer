import { useFormatBytes } from '@/hooks/useFormatBytes'
import { Badge } from './Badge'
import { DownTrendIcon } from './icons/downTrend'
import { InfoIcon } from './icons/Info'
import { UpTrendIcon } from './icons/upTrend'
import { Image } from './Image'

interface CardImageProps {
  image: {
    src: string
    size: number
    sizeOptimized: number
  }
  onClick?: () => void
}

export const CardImage: React.FC<CardImageProps> = ({ image, onClick }) => {
  const formatBytes = useFormatBytes()
  const optimization = (1 - image.sizeOptimized / image.size) * 100
  return (
    <div
      onClick={onClick && onClick}
      className="block rounded-lg p-4 shadow-sm shadow-indigo-300 w-80"
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
              {+optimization.toFixed(2)}%
            </Badge>
          </div>
        </div>
      </div>
    </div>
  )
}

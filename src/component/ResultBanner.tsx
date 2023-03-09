import { useFormatBytes } from '@/hooks/useFormatBytes'
import { DownTrendIcon } from './icons/downTrend'
import { UpTrendIcon } from './icons/upTrend'

interface ResultBannerProps {
  size: number
  sizeOptimized: number
  optimization: number
}

export const ResultBanner: React.FC<ResultBannerProps> = ({
  size,
  sizeOptimized,
  optimization
}) => {
  const formatBytes = useFormatBytes()
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="max-w-screen-xl px-4  mx-auto text-center mb-12">
        <dl className="grid max-w-screen-md gap-8 mx-auto text-gray-900 sm:grid-cols-3 dark:text-white">
          <div className="flex flex-col items-center justify-center">
            <dt className="mb-2 text-3xl md:text-4xl font-extrabold">
              {formatBytes(size)}
            </dt>
            <dd className="font-light text-gray-500 dark:text-gray-400">
              Size
            </dd>
          </div>
          <div className="flex flex-col items-center justify-center">
            <dt className="mb-2 text-3xl md:text-4xl font-extrabold">
              {formatBytes(sizeOptimized)}
            </dt>
            <dd className="font-light text-gray-500 dark:text-gray-400">
              Size optimized
            </dd>
          </div>
          <div className="flex flex-col items-center justify-center">
            <dt
              className={`mb-2 text-3xl md:text-4xl font-extrabold flex gap-2 items-center ${
                optimization > 0 ? 'text-green-700' : 'text-red-700'
              }`}
            >
              {optimization > 0 ? (
                <UpTrendIcon className="text-green-700 w-8 h-8" />
              ) : (
                <DownTrendIcon className="text-green-700 w-8 h-8" />
              )}
              {+optimization.toFixed(2)}%
            </dt>
            <dd className="font-light text-gray-500 dark:text-gray-400">
              Optimization
            </dd>
          </div>
        </dl>
      </div>
    </section>
  )
}

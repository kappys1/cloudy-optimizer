import { type DetailAsset } from '@/lib/getAssetsNode'
import { cloudyUrl, downloadImage } from '@/utils/utils'
import { DownloadIcon } from './icons/download'
import { UploadIcon } from './icons/upload'

interface HomeDownloaderProps {
  urls: DetailAsset[]
}

export const HomeDownloader: React.FC<HomeDownloaderProps> = ({ urls }) => {
  const optimized = urls.filter((url) => url.sizeOptimized < url.size)
  const handleDownload = () => {
    optimized.map(async (url) => {
      await downloadImage(cloudyUrl(url.src))
    })
  }

  return (
    <div className="flex w-full justify-center pb-28 pt-12">
      <div className="flex max-w-3xl w-full gap-16 justify-center items-center">
        <p className="flex gap-2 items-center">
          <button
            type="button"
            className="flex justify-center items-center  gap-2  text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          >
            Upload into your cloudinary
            <UploadIcon />
          </button>
        </p>

        <p className="flex gap-2 items-center">
          <button
            onClick={handleDownload}
            type="submit"
            className=" h-10 text-white flex justify-center items-center gap-2  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled"
          >
            Download {optimized.length} optimized images <DownloadIcon />
          </button>
        </p>
      </div>
    </div>
  )
}

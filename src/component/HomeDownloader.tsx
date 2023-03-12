import { type DetailAsset } from '@/lib/getAssetsNode'
import {
  cloudyUrl,
  downloadImage,
  downloadImageAsZip,
  fetcher
} from '@/utils/utils'
import { toast } from 'sonner'
import { buttonBlueClassName, buttonLightClassName } from './Button'
import { DownloadIcon } from './icons/download'
import { UploadIcon } from './icons/upload'
import { saveAs } from 'file-saver'

interface HomeDownloaderProps {
  urls: DetailAsset[]
}

export const HomeDownloader: React.FC<HomeDownloaderProps> = ({ urls }) => {
  const optimized = urls.filter((url) => url.sizeOptimized < url.size)
  const handleDownload = () => {
    const promise = downloadImageAsZip(urls.map((u) => cloudyUrl(u.src))).then(
      (blob) => {
        saveAs(blob, 'optimized-images.zip')
      }
    )

    toast.promise(promise, {
      loading: 'Loading...',
      success: () => {
        return 'zip with optimized images downloaded'
      },
      error: 'Error'
    })
  }

  return (
    <div className="flex w-full justify-center pb-28 pt-12">
      <div className="flex max-w-3xl w-full gap-16 justify-center items-center">
        {/* <p className="flex gap-2 items-center">
          <button type="button" className={buttonLightClassName}>
            Upload to cloudinary
            <UploadIcon />
          </button>
        </p> */}

        <p className="flex gap-2 items-center">
          <button
            onClick={handleDownload}
            type="submit"
            className={buttonBlueClassName}
          >
            Download {optimized.length} optimized images <DownloadIcon />
          </button>
        </p>
      </div>
    </div>
  )
}

import { type DetailAsset } from '@/lib/getAssetsNode'
import { cloudyUrl, downloadImageAsZip } from '@/utils/utils'
import { saveAs } from 'file-saver'
import { toast } from 'sonner'
import { buttonBlueClassName } from './Button'
import { DownloadIcon } from './icons/download'

interface HomeDownloaderProps {
  urls: DetailAsset[]
}

export const HomeDownloader: React.FC<HomeDownloaderProps> = ({ urls }) => {
  const optimized = urls.filter((url) => url.sizeOptimized < url.size)
  const handleDownload = () => {
    downloadImageAsZip(urls.map((u) => cloudyUrl(u.src)))
      .then((blob) => {
        toast.success('zip with optimized images downloaded')
        saveAs(blob, 'optimized-images.zip')
      })
      .catch(() => {
        toast.error('Error downloading zip')
      })
  }

  return (
    <div className='flex w-full justify-center pb-28 pt-12'>
      <div className='flex max-w-3xl w-full gap-16 justify-center items-center'>
        {/* <p className="flex gap-2 items-center">
          <button type="button" className={buttonLightClassName}>
            Upload to cloudinary
            <UploadIcon />
          </button>
        </p> */}

        <p className='flex gap-2 items-center'>
          <button
            onClick={handleDownload}
            type='submit'
            disabled={optimized.length === 0}
            className={`${buttonBlueClassName} ${
              optimized.length === 0 && 'cursor-not-allowed'
            }`}
          >
            Download {optimized.length} optimized images <DownloadIcon />
          </button>
        </p>
      </div>
    </div>
  )
}

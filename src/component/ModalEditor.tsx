import { useFormatBytes } from '@/hooks/useFormatBytes'
import { type DetailAsset } from '@/lib/getAssetsNode'
import { cloudyUrl, downloadImage, getNameFromUrl } from '@/utils/utils'
import { toast } from 'sonner'
import { Badge } from './Badge'
import { buttonBlueClassName } from './Button'
import { DownTrendIcon } from './icons/downTrend'
import { UpTrendIcon } from './icons/upTrend'
import { ImageEdit } from './ImageEdit'
import { Modal } from './Modal/Modal'

interface ModalEditorProps {
  show: boolean
  onClose: () => void
  item: DetailAsset
}

export const ModalEditor: React.FC<ModalEditorProps> = ({
  show,
  onClose,
  item
}) => {
  const formatBytes = useFormatBytes()
  const { src } = item
  const cloudinarySrc = cloudyUrl(src)
  const codeCloudinarySrc = cloudinarySrc.replace(/demo/g, '[Cloud name]')

  const handleDownload = async () => {
    await downloadImage(cloudinarySrc)
    close()
  }
  const handleCopy = async () => {
    await navigator.clipboard.writeText(codeCloudinarySrc)
    toast.success('Cloudinary URL copied in your clipboard')
  }

  const nameFile = getNameFromUrl(src)
  const { optimization } = item

  return (
    <Modal show={show} onClose={onClose}>
      <div className="relative w-full h-full max-w-7xl md:h-auto">
        {/* <!-- Modal content --> */}
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 ">
          {/* <!-- Modal header --> */}
          <div className="flex items-center justify-between py-3 px-6 border-b rounded-t dark:border-gray-600">
            <h3 className="text-md font-medium text-gray-900 dark:text-white">
              Detail of {nameFile}
            </h3>
            <button
              onClick={onClose}
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          {/* <!-- Modal body --> */}
          <div className="p-6 ">
            <ImageEdit src={src} cloudinarySrc={cloudinarySrc} />
            <div className="flex flex-col">
              <div className="flex justify-between">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Original Size
                </label>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Optimized Size
                </label>
              </div>
              <div className="flex justify-between">
                <div className="flex justify-center">
                  <div className="">{formatBytes(item?.size)}</div>
                </div>
                <div className="flex flex-col justify-center items-end">
                  <div className="flex gap-2 justify-center items-center">
                    <div className="">{formatBytes(item?.sizeOptimized)}</div>
                    <Badge
                      color={optimization > 0 ? 'bg-green-600' : 'bg-red-600'}
                      icon={
                        optimization > 0 ? <UpTrendIcon /> : <DownTrendIcon />
                      }
                    >
                      {+optimization.toFixed(2)}%
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
            <div className="pt-4">
              <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Cloudinary URL
                </label>
                <div
                  className="border border-solid border-slate-800 p-2 bg-slate-900 text-blue-300 text-sm rounded-md cursor-pointer"
                  onClick={handleCopy}
                >
                  {codeCloudinarySrc}
                </div>
              </div>
            </div>
          </div>
          {/* <!-- Modal footer --> */}
          <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
            <button
              onClick={handleDownload}
              type="button"
              className={buttonBlueClassName}
            >
              Download
            </button>
          </div>
        </div>
      </div>
    </Modal>
  )
}

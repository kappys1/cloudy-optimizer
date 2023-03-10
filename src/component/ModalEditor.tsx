import { cloudyUrl, downloadImage } from '@/utils/utils'
import { toast } from 'sonner'
import { buttonBlueClassName } from './Button'
import { ImageEdit } from './ImageEdit'
import { Modal } from './Modal/Modal'

interface ModalEditorProps {
  show: boolean
  onClose: () => void
  src: string
}

export const ModalEditor: React.FC<ModalEditorProps> = ({
  show,
  onClose,
  src
}) => {
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
  return (
    <Modal show={show} onClose={onClose}>
      <div className="relative w-full h-full max-w-7xl md:h-auto">
        {/* <!-- Modal content --> */}
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          {/* <!-- Modal header --> */}
          <div className="flex items-center justify-between p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Extra Large modal
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
          <div className="p-6 space-y-6">
            <ImageEdit src={src} cloudinarySrc={src} />
            <div className="pt-4">
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
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

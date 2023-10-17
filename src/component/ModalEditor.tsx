import { useFormatBytes } from '@/hooks/useFormatBytes'
import { type DetailAsset } from '@/lib/getAssetsNode'
import { cloudyUrl, downloadImage, getNameFromUrl } from '@/utils/utils'
import debounce from 'just-debounce-it'
import React from 'react'
import { toast } from 'sonner'
import { Badge } from './Badge'
import { buttonBlueClassName } from './Button'
import { ImageEdit } from './ImageEdit'
import { Modal } from './Modal/Modal'
import { DownTrendIcon } from './icons/downTrend'
import { UpTrendIcon } from './icons/upTrend'

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
  const [quality, setQuality] = React.useState<number | string>('auto')
  const [sizeOptimizedImage, setSizeOptimizedImage] = React.useState<number>(
    item?.sizeOptimized
  )
  const [optimization, setOptimization] = React.useState<number>(
    item?.optimization
  )

  const formatBytes = useFormatBytes()
  const { src, cloudinaryName } = item

  const cloudinarySrc = cloudyUrl(src, cloudinaryName, { quality })
  const handleDownload = async () => {
    await downloadImage(cloudinarySrc)
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(cloudinarySrc)
    toast.success('Cloudinary URL copied in your clipboard')
  }

  const handleChangeBytesImage = (bytes: number) => {
    setSizeOptimizedImage(bytes)
    const optimization = (1 - bytes / item.size) * 100
    setOptimization(optimization)
  }

  const nameFile = getNameFromUrl(src)

  const handleOnSlideChange = debounce(
    (val: React.ChangeEvent<HTMLInputElement>) => {
      setQuality(val.target.value)
    },
    250
  )
  const handleOnClose = () => {
    setQuality('auto')
    onClose()
  }
  return (
    <Modal show={show} onClose={handleOnClose}>
      <div className='relative w-full h-full max-w-7xl md:h-auto'>
        {/* <!-- Modal content --> */}
        <div className='relative bg-white rounded-lg shadow dark:bg-gray-700 '>
          {/* <!-- Modal header --> */}
          <div className='flex items-center justify-between py-3 px-6 border-b rounded-t dark:border-gray-600'>
            <h3 className='text-md font-medium text-gray-900 dark:text-white'>
              Detail of {nameFile}
            </h3>
            <button
              onClick={handleOnClose}
              type='button'
              className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white'
            >
              <svg
                aria-hidden='true'
                className='w-5 h-5'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                  clipRule='evenodd'
                ></path>
              </svg>
              <span className='sr-only'>Close modal</span>
            </button>
          </div>
          {/* <!-- Modal body --> */}
          <div className='p-6 '>
            <ImageEdit
              src={src}
              cloudinarySrc={cloudinarySrc}
              onChange={handleChangeBytesImage}
            />
            <div className='flex flex-col'>
              <div className='flex justify-between'>
                <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                  Original Size
                </label>
                <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                  Optimized Size
                </label>
              </div>
              <div className='flex justify-between'>
                <div className='flex justify-center'>
                  <div className=''>{formatBytes(item?.size)}</div>
                </div>
                <div className='flex flex-col justify-center items-end'>
                  <div className='flex gap-2 justify-center items-center'>
                    <div className=''>{formatBytes(sizeOptimizedImage)}</div>
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
            <div className='pt-4'>
              <div className='mb-4'>
                <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                  Cloudinary URL
                </label>
                <div
                  className='border border-solid border-slate-800 p-2 bg-slate-900 text-blue-300 text-sm rounded-md cursor-pointer'
                  onClick={handleCopy}
                >
                  {cloudinarySrc}
                </div>
              </div>
            </div>
            <div className='pt-4'>
              <div className='mb-2'>
                <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white mt-2'>
                  Edit
                </label>
                <div className='flex flex-col gap-2'>
                  <label
                    htmlFor='default-range'
                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-white mt-2'
                  >
                    Quality
                  </label>
                  <div className='mb-2'>
                    {quality === 'auto' ? quality : `${quality}%`}
                  </div>
                  <label className='relative inline-flex items-center cursor-pointer mb-2'>
                    <input
                      type='checkbox'
                      value='auto'
                      className='sr-only peer'
                      onChange={(val) => {
                        setQuality(val.target.value)
                      }}
                      checked={quality === 'auto'}
                    />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    <span className='ml-3 text-sm font-medium text-gray-900 dark:text-gray-300'>
                      Auto
                    </span>
                  </label>
                  <input
                    onChange={(val) => {
                      handleOnSlideChange(val)
                    }}
                    id='default-range'
                    type='range'
                    // value={quality}
                    className='w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700'
                  />
                </div>
              </div>
            </div>
          </div>
          {/* <!-- Modal footer --> */}
          <div className='flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600'>
            <button
              onClick={handleDownload}
              type='button'
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

import Head from 'next/head'
import 'flowbite'
import styles from '@/styles/Home.module.css'

import { useState } from 'react'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { Form } from '@/component/Form'
import { Background } from '@/component/Background'
import { CardImage } from '@/component/CardImage'
import { ModalEditor } from '@/component/ModalEditor'
import { ResultBanner } from '@/component/ResultBanner'
import { type DetailAsset, type Response } from '@/lib/getAssetsNode'
import { CloudinaryIcon } from '@/component/icons/cloudinary'
import { Loading } from '@/component/Loading'
import { HomeDownloader } from '@/component/HomeDownloader'
import { Toaster } from 'sonner'

export default function Home({ data }: { data: string[] }) {
  const pagesUrl = '/api/pages'
  const [dataTest, setDataTest] = useState<Response>()
  const [showModal, setShowModal] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [showDetail, setShowDetail] = useState<boolean>(false)
  const [selectedAsset, setSelectedAsset] = useState<DetailAsset>({
    optimization: 0,
    size: 0,
    sizeOptimized: 0,
    src: ''
  })
  const [parent] = useAutoAnimate(/* optional config */)

  const handleSubmit = async (event: any) => {
    event.preventDefault()
    const url = event.target.url.value
    setIsLoading(true)
    const test = await fetch(pagesUrl, {
      method: 'POST',
      body: JSON.stringify({ url })
    })
      .then(async (res) => await res.json())
      .catch(() => {
        setIsLoading(false)
      })
    setIsLoading(false)
    setDataTest(test)
  }

  const handleOnImageClick = (img: DetailAsset) => {
    setShowModal(true)
    setSelectedAsset(img)
  }

  const handleOnCloseModal = () => {
    console.log('close')
    setShowModal(false)
  }

  return (
    <>
      <Head>
        <title>Cloudy Optimizer</title>
        <meta
          name="description"
          content="optimize the size of your website images"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="isolate bg-white">
        <Background>
          <Toaster richColors position="top-right" />
          {/* <main> */}
          <div className="mx-auto max-w-6xl mt-24 mb-12 flex justify-center">
            <div className="text-center max-w-4xl">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                <span className={'text-blue-700'}>Optimize</span> the size of
                your website images
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Introduce your website URL and see how you can improve your
                images
              </p>
              <div className="mt-24">
                <Form isLoading={isLoading} onSubmit={handleSubmit} />
              </div>
              <p className="mt-2 text-xs leading-8 text-gray-600 flex justify-center items-center gap-2">
                Optimized with <CloudinaryIcon />
              </p>
            </div>
          </div>

          {isLoading && (
            <div className="w-full flex justify-center">
              <Loading className={'w-12'} />
            </div>
          )}

          <div ref={parent}>
            {!isLoading && dataTest && dataTest.detail && (
              <>
                <ResultBanner
                  optimization={dataTest.optimization}
                  size={dataTest.totalSize}
                  sizeOptimized={dataTest.totalOptimizedSize}
                />
                <HomeDownloader urls={dataTest.detail} />
                <div
                  className="text-center text-blue-500 cursor-pointer"
                  onClick={() => {
                    setShowDetail(!showDetail)
                  }}
                >
                  <p className="pb-8">
                    {showDetail ? 'Hide' : 'Show more '} details
                  </p>
                </div>
              </>
            )}

            {!isLoading && dataTest && dataTest.detail && showDetail && (
              <div className={styles.grid}>
                {dataTest.detail?.map((item, i) => {
                  return (
                    <CardImage
                      key={`image-${i}`}
                      image={item}
                      onClick={() => {
                        handleOnImageClick(item)
                      }}
                    ></CardImage>
                  )
                })}
              </div>
            )}
          </div>
          {dataTest && (
            <ModalEditor
              show={showModal}
              onClose={handleOnCloseModal}
              item={selectedAsset}
            />
          )}
        </Background>
      </div>
    </>
  )
}

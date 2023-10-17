import 'flowbite'
import Head from 'next/head'

import { Background } from '@/component/Background'
import { Hero } from '@/component/Hero'
import { ModalEditor } from '@/component/ModalEditor'
import { ResultDetail } from '@/component/ResultDetail'
import { ResultInfo } from '@/component/ResultInfo'
import { type DetailAsset, type Response } from '@/lib/getAssetsNode'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { useState } from 'react'
import { Toaster } from 'sonner'

export default function Home({ data }: { data: string[] }) {
  const [dataTest, setDataTest] = useState<Response>()
  const [showModal, setShowModal] = useState<boolean>(false)

  const [showDetail, setShowDetail] = useState<boolean>(false)
  const [selectedAsset, setSelectedAsset] = useState<DetailAsset>({
    optimization: 0,
    size: 0,
    sizeOptimized: 0,
    src: ''
  })
  const [parent] = useAutoAnimate(/* optional config */)

  const handlerOnSubmit = (e: any) => {
    setDataTest(e)
  }

  const handleOnImageClick = (img: DetailAsset) => {
    setShowModal(true)
    setSelectedAsset(img)
  }

  const handleOnCloseModal = () => {
    setShowModal(false)
  }

  return (
    <>
      <Head>
        <title>Cloudy Optimizer</title>
        <meta
          name='description'
          content='optimize the size of your website images'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='isolate bg-white'>
        <Background>
          <Toaster richColors position='top-right' />
          <Hero onSubmit={handlerOnSubmit} />
          <div ref={parent}>
            <ResultInfo data={dataTest} onClickShowDetail={setShowDetail} />
            {dataTest && dataTest.detail && showDetail && (
              <ResultDetail data={dataTest} onClickImage={handleOnImageClick} />
            )}
          </div>
          {dataTest && dataTest.detail.length > 0 && (
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

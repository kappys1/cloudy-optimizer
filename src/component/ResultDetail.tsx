import { type DetailAsset, type Response } from '@/lib/getAssetsNode'
import styles from '@/styles/Home.module.css'
import { CardImage } from './CardImage'

interface ResultDetailProps {
  data: Response | undefined
  onClickImage: (img: any) => void
}
export const ResultDetail = ({ data, onClickImage }: ResultDetailProps) => {
  const handleOnClickImage = (item: DetailAsset) => {
    onClickImage && onClickImage(item)
  }
  return (
    <>
      <div className={styles.grid}>
        {data &&
          data.detail?.map((item, i) => {
            return (
              <CardImage
                key={`image-${i}`}
                image={item}
                onClick={() => {
                  handleOnClickImage(item)
                }}
              ></CardImage>
            )
          })}
      </div>
    </>
  )
}

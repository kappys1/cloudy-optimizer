import { useModal } from '@/component/Modal/Modal.hook'
import { useEffect, useRef } from 'react'
interface ModalProps {
  children: React.ReactNode
  show: boolean
  onClose?: () => void
}
export const Modal: React.FC<ModalProps> = ({ children, show, onClose }) => {
  const ref = useRef<HTMLDialogElement>(null)
  const { close, isOpen, open } = useModal(ref.current)

  // closeByProps
  useEffect(() => {
    if (show && !isOpen) {
      open()
    } else if (!show && isOpen) {
      close()
    }
  }, [show])

  // backdrop detect close
  useEffect(() => {
    if (show && !isOpen) {
      onClose && onClose()
      close()
    }
  }, [isOpen])

  return (
    <dialog
      ref={ref}
      className={
        'open:fixed open:bg-transparent backdrop:fixed backdrop:bg-black backdrop:bg-opacity-50'
      }
    >
      {show && children}
    </dialog>
  )
}

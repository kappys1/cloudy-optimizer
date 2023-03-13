import { useCallback, useEffect, useState } from 'react'

export const useModal = (
  element: HTMLDialogElement | null,
  defaultOpen = false
) => {
  const modalElm = element
  const [isOpen, setIsOpen] = useState(defaultOpen)

  const close = useCallback(() => {
    setIsOpen(false)
    modalElm && modalElm.close()
  }, [modalElm])

  const open = useCallback(() => {
    setIsOpen(true)
    modalElm && modalElm.showModal()
  }, [modalElm])

  useEffect(() => {
    if (isOpen) {
      const detectOutsideClick = (event: any) => {
        if (event.target.nodeName === 'DIALOG') {
          close()
        }
      }
      modalElm?.addEventListener('click', detectOutsideClick)
      document.onkeydown = function (evt) {
        if (evt.key === 'Escape') {
          close()
        }
      }
      return () => {
        modalElm?.removeEventListener('click', detectOutsideClick)
        document.onkeydown = null
      }
    }
  }, [close, isOpen, modalElm])

  return {
    isOpen,
    close,
    open
  }
}

import { Popover } from 'flowbite'
import type { PopoverOptions, PopoverInterface } from 'flowbite'
import { useEffect, useState } from 'react'

export const useTooltip = (targetEl: HTMLElement, triggerEl: HTMLElement) => {
  const [tooltip, setTooltip] = useState<PopoverInterface | null>(null)
  // options with default values

  useEffect(() => {
    const options: PopoverOptions = {
      placement: 'top',
      triggerType: 'hover',
      offset: 10,
      onHide: () => {
        console.log('popover is shown')
      },
      onShow: () => {
        console.log('popover is hidden')
      },
      onToggle: () => {
        console.log('popover is toggled')
      }
    }
    const popover = new Popover(targetEl, triggerEl, options)
    setTooltip(popover)
  }, [targetEl, triggerEl])

  const handleOpen = () => {
    tooltip && tooltip.show()
  }

  return { open: handleOpen }
}

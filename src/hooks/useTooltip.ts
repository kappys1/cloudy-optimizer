import type { PopoverInterface, PopoverOptions } from 'flowbite'
import { Popover } from 'flowbite'
import { useEffect, useState } from 'react'

export const useTooltip = (targetEl: HTMLElement, triggerEl: HTMLElement) => {
  const [tooltip, setTooltip] = useState<PopoverInterface | null>(null)
  // options with default values

  useEffect(() => {
    const options: PopoverOptions = {
      placement: 'top',
      triggerType: 'hover',
      offset: 10
    }
    const popover = new Popover(targetEl, triggerEl, options)
    setTooltip(popover)
  }, [targetEl, triggerEl])

  const handleOpen = () => {
    tooltip && tooltip.show()
  }

  return { open: handleOpen }
}

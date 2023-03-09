import Panzoom, { type CurrentValues } from '@panzoom/panzoom'
import { useEffect } from 'react'

export const useTwoUpDiff = (element1: HTMLElement, element2: HTMLElement) => {
  useEffect(() => {
    import('two-up-element')

    const init = () => {
      const twoUp = document.getElementsByTagName('two-up')[0]
      console.log(twoUp)
      const panzoom = Panzoom(element1, {
        maxScale: 5,
        overflow: 'hidden',
        setTransform: (_: HTMLElement, { scale, x, y }: CurrentValues) => {
          panzoom.setStyle(
            'transform',
            `scale(${scale}) translate(${x}px, ${y}px)`
          )
          panzoom2.setStyle(
            'transform',
            `scale(${scale}) translate(${x}px, ${y}px)`
          )
          const posTwo = twoUp.style.getPropertyValue('--split-point')
          const calc = parseInt(posTwo, 10) - x + 'px'
          console.log(posTwo, x, calc)
          twoUp.style['--split-point'] = `${calc}`
          twoUp.style.setProperty('--split-point', calc)
        }
      })
      const panzoom2 = Panzoom(element2, {
        maxScale: 5,
        overflow: 'hidden',
        setTransform: (_: HTMLElement, { scale, x, y }: CurrentValues) => {
          panzoom2.setStyle(
            'transform',
            `scale(${scale}) translate(${x}px, ${y}px)`
          )
          panzoom.setStyle(
            'transform',
            `scale(${scale}) translate(${x}px, ${y}px)`
          )
          //   twoUp.style['--split-point'] = `${x}`
        }
      })

      element1.parentElement?.addEventListener('wheel', panzoom.zoomWithWheel)
      element2.parentElement?.addEventListener('wheel', panzoom2.zoomWithWheel)
    }

    element1 && element2 && init()
  }, [element1, element2])
}

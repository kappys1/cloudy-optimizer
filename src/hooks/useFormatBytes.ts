export const useFormatBytes = () => {
  const convertSize = (size: number) => {
    if (size < 1000) {
      return `${size} B`
    }
    if (size < 1000000) {
      return `${(size / 1000).toFixed(2)} KB`
    }
    if (size < 1000000000) {
      return `${(size / 1000000).toFixed(2)} MB`
    }
  }

  return convertSize
}

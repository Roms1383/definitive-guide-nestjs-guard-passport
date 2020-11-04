export default (delay: number): Promise<void> =>
  new Promise(resolve => {
    const id = setTimeout(() => {
      clearTimeout(id)
      resolve()
    }, delay)
  })

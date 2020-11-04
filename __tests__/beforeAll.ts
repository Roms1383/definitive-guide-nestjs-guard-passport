import { bootstrap } from './server'

module.exports = async () => {
  ;(global as any).__APP__ = await bootstrap()
}

import { INestApplication } from '@nestjs/common'
import { teardown } from './server'

module.exports = async () => {
  await teardown((global as any).__APP__ as INestApplication)
}

import { HttpStatus } from '@nestjs/common'

import { LocalGuard } from '../src/local.guard'
import { LocalStrategy } from '../src/local.strategy'
import client from './client'
import pretty from './pretty'
import { COOL_DEV } from './user.seed'

const TITLE = pretty({ guard: LocalGuard, strategies: LocalStrategy })

describe(TITLE, () => {
  describe('fails', () => {
    it('wrong credentials', async () => {
      const { status } = await client.post('login', {
        ...COOL_DEV,
        password: 'wrong',
      })
      expect(status).toBe(HttpStatus.BAD_REQUEST)
    })
  })
  describe('succeeds', () => {
    it('correct credentials', async () => {
      const { status, data } = await client.post('login', COOL_DEV)
      expect(status).toBe(HttpStatus.OK)
      expect(data).toBeDefined()
    })
  })
})

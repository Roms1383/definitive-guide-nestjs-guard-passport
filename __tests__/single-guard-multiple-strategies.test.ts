import { HttpStatus } from '@nestjs/common'

import { JwtBearerStrategy } from '../src/jwt-bearer.strategy'
import { JwtQueryStrategy } from '../src/jwt-query.strategy'
import { JwtGuard } from '../src/jwt.guard'
import client from './client'
import { SECURED_DATA } from './expectations'
import { FORGED_USER_ACCESS_TOKEN } from './malicious.seed'
import pretty from './pretty'
import { JOHN_DOE } from './user.seed'

const TITLE = pretty({
  guard: JwtGuard,
  strategies: [JwtBearerStrategy, JwtQueryStrategy],
})

describe(TITLE, () => {
  describe('fails', () => {
    it('wrong access token', async () => {
      const { status } = await client.get('secured', {
        headers: { Authorization: `Bearer ${FORGED_USER_ACCESS_TOKEN}` },
      })
      expect(status).toBe(HttpStatus.UNAUTHORIZED)
    })
  })
  describe('succeeds', () => {
    let VALID_ACCESS_TOKEN
    beforeAll(async () => {
      const { data } = await client.post('login', JOHN_DOE)
      VALID_ACCESS_TOKEN = data
    })
    it('correct access token in bearer', async () => {
      const { status, data } = await client.get('secured', {
        headers: { Authorization: `Bearer ${VALID_ACCESS_TOKEN}` },
      })
      expect(status).toBe(HttpStatus.OK)
      expect(data).toBe(SECURED_DATA)
    })
    it('correct access token in query', async () => {
      const { status, data } = await client.get(
        `secured?token=${VALID_ACCESS_TOKEN}`,
      )
      expect(status).toBe(HttpStatus.OK)
      expect(data).toBe(SECURED_DATA)
    })
  })
})

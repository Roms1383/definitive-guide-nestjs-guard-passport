import { HttpStatus } from '@nestjs/common'
import { JwtBearerStrategy } from '../src/jwt-bearer.strategy'
import { JwtQueryStrategy } from '../src/jwt-query.strategy'
import { JwtGuard } from '../src/jwt.guard'
import { RateGuard } from '../src/rate.guard'
import { RateStrategy } from '../src/rate.strategy'
import { RolesGuard } from '../src/roles.guard'
import client from './client'
import { ADMIN_SECURED_DATA, LIMITED_SECURED_DATA } from './expectations'
import { FORGED_ADMIN_ACCESS_TOKEN } from './malicious.seed'
import pretty from './pretty'
import { COOL_DEV, JOHN_DOE } from './user.seed'
import wait from './wait'

const FIRST_TITLE = pretty([
  { guard: JwtGuard, strategies: [JwtBearerStrategy, JwtQueryStrategy] },
  { guard: RateGuard, strategies: RateStrategy },
])

describe(FIRST_TITLE, () => {
  describe('fails', () => {
    let VALID_ACCESS_TOKEN
    beforeAll(async () => {
      const { data } = await client.post('login', JOHN_DOE)
      VALID_ACCESS_TOKEN = data
    })
    it('if accessed too often', async () => {
      const { status: s1, data: d1 } = await client.get('secured/limited', {
        headers: { Authorization: `Bearer ${VALID_ACCESS_TOKEN}` },
      })
      expect(s1).toBe(HttpStatus.OK)
      expect(d1).toBe(LIMITED_SECURED_DATA)
      const { status } = await client.get('secured/limited', {
        headers: { Authorization: `Bearer ${VALID_ACCESS_TOKEN}` },
      })
      expect(status).toBe(429)
    })
  })
  describe('succeeds', () => {
    let VALID_ACCESS_TOKEN
    beforeAll(async () => {
      const { data } = await client.post('login', JOHN_DOE)
      VALID_ACCESS_TOKEN = data
    })
    it('if accessed sparingly', async () => {
      await wait(1024)
      const { status: s1, data: d1 } = await client.get('secured/limited', {
        headers: { Authorization: `Bearer ${VALID_ACCESS_TOKEN}` },
      })
      expect(s1).toBe(HttpStatus.OK)
      expect(d1).toBe(LIMITED_SECURED_DATA)
      await wait(1024)
      const { status: s2, data: d2 } = await client.get('secured/limited', {
        headers: { Authorization: `Bearer ${VALID_ACCESS_TOKEN}` },
      })
      expect(s2).toBe(HttpStatus.OK)
      expect(d2).toBe(LIMITED_SECURED_DATA)
    }, 3000)
  })
})

const SECOND_TITLE = pretty([
  { guard: JwtGuard, strategies: [JwtBearerStrategy, JwtQueryStrategy] },
  { guard: RolesGuard },
])

describe(SECOND_TITLE, () => {
  describe('fails', () => {
    it('wrong access token', async () => {
      const { status } = await client.get('admin/secured', {
        headers: { Authorization: `Bearer ${FORGED_ADMIN_ACCESS_TOKEN}` },
      })
      expect(status).toBe(HttpStatus.UNAUTHORIZED)
    })
  })
  describe('succeeds', () => {
    let VALID_ACCESS_TOKEN
    beforeAll(async () => {
      const { data } = await client.post('login', COOL_DEV)
      VALID_ACCESS_TOKEN = data
    })
    it('correct access token', async () => {
      const { status, data } = await client.get('admin/secured', {
        headers: { Authorization: `Bearer ${VALID_ACCESS_TOKEN}` },
      })
      expect(status).toBe(HttpStatus.OK)
      expect(data).toBe(ADMIN_SECURED_DATA)
    })
  })
})

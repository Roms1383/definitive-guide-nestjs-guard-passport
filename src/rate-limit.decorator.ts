import { ExecutionContext, SetMetadata } from '@nestjs/common'
import { Reflector } from '@nestjs/core'

const METADATA_KEY_RATE_LIMIT = 'METADATA_KEY_RATE_LIMIT'

export const getRateLimit = (
  context: ExecutionContext,
  reflector: Reflector,
): number | undefined =>
  reflector.get(METADATA_KEY_RATE_LIMIT, context.getHandler())

export const RateLimit = (window: number) =>
  SetMetadata(METADATA_KEY_RATE_LIMIT, window)

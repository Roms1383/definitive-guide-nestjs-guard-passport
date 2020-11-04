import { ExecutionContext, SetMetadata } from '@nestjs/common'
import { Reflector } from '@nestjs/core'

export const METADATA_KEY_ROLES = 'METADATA_KEY_ROLES'

export const getRoles = (
  context: ExecutionContext,
  reflector: Reflector,
): string[] | undefined =>
  reflector.get(METADATA_KEY_ROLES, context.getHandler())

export const Roles = (...roles: string[]) =>
  SetMetadata(METADATA_KEY_ROLES, roles)

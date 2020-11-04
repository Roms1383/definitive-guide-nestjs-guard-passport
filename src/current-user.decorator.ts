import { createParamDecorator, ExecutionContext } from '@nestjs/common'

import { PassportUser } from './user.entity'

export const getCurrentUser = (request: any): PassportUser =>
  request.isAuthenticated() ? request.user : undefined

export const CurrentUser = createParamDecorator(
  (_: unknown, context: ExecutionContext) =>
    getCurrentUser(context.switchToHttp().getRequest()),
)

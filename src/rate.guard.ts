import { ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AuthGuard } from '@nestjs/passport'
import { Observable } from 'rxjs'

import { getRateLimit } from './rate-limit.decorator'

@Injectable()
export class RateGuard extends AuthGuard(['rate', 'jwt']) {
  constructor(private readonly reflector: Reflector) {
    super()
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const limit = getRateLimit(context, this.reflector) || NaN
    if (isNaN(limit)) return true
    const request = context.switchToHttp().getRequest()
    request.limit = limit
    return super.canActivate(context)
  }
}

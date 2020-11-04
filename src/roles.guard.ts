import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Observable } from 'rxjs'

import { getCurrentUser } from './current-user.decorator'
import { getRoles } from './roles.decorator'
import { PassportUser } from './user.entity'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest()
    const user: PassportUser = getCurrentUser(request)
    if (!user) throw new UnauthorizedException()
    const roles = getRoles(context, this.reflector)
    if (!roles) return true
    if (!user.roles) return false
    return user.roles.some(role => roles.includes(role))
  }
}

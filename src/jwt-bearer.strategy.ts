import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'

import { JWT, PassportUser } from './user.entity'
import { UserService } from './user.service'

@Injectable()
export class JwtBearerStrategy extends PassportStrategy(
  Strategy,
  'jwt.bearer',
) {
  constructor(private readonly users: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'some-jwt-secret',
    })
  }

  validate(jwt: JWT): PassportUser | never {
    const valid = this.users.validateJWT(jwt)
    if (!valid) throw new UnauthorizedException()
    const { username, roles } = jwt
    return { username, roles }
  }
}

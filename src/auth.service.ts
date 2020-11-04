import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { PassportUser } from './user.entity'

@Injectable()
export class AuthService {
  constructor(private readonly jwt: JwtService) {}

  allow(user: PassportUser): string {
    return this.jwt.sign(user)
  }
}

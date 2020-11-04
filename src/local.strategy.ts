import { BadRequestException, Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'

import { PassportUser, User } from './user.entity'
import { UserService } from './user.service'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private readonly service: UserService) {
    super()
  }

  async validate(
    username: string,
    password: string,
  ): Promise<PassportUser | never> {
    const user: User | undefined = await this.service.validateCredentials({
      username,
      password,
    })
    if (!user) throw new BadRequestException()
    /* eslint-disable @typescript-eslint/no-unused-vars */
    const { password: _, ...info } = user
    return info
  }
}

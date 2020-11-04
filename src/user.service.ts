import { Injectable } from '@nestjs/common'
import { COOL_DEV, JOHN_DOE } from '../__tests__/user.seed'
import { Credentials, JWT, User } from './user.entity'

@Injectable()
export class UserService {
  private users: User[] = [COOL_DEV, JOHN_DOE]

  validateCredentials(credentials: Credentials) {
    return this.users.find(
      ({ username, password }) =>
        username === credentials.username && password === credentials.password,
    )
  }

  validateJWT(jwt: JWT) {
    return this.users.find(({ username }) => username === jwt.username)
  }
}

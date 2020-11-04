import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Module,
  Post,
  UseGuards,
} from '@nestjs/common'
import { JwtModule, JwtModuleOptions, JwtService } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'

import { HitService } from '../src/hit.service'
import { AuthService } from '../src/auth.service'
import { CurrentUser } from '../src/current-user.decorator'
import { JwtQueryStrategy } from '../src/jwt-query.strategy'
import { JwtBearerStrategy } from '../src/jwt-bearer.strategy'
import { JwtGuard } from '../src/jwt.guard'
import { RateStrategy } from '../src/rate.strategy'
import { LocalGuard } from '../src/local.guard'
import { LocalStrategy } from '../src/local.strategy'
import { RateLimit } from '../src/rate-limit.decorator'
import { Roles } from '../src/roles.decorator'
import { RolesGuard } from '../src/roles.guard'
import { RateGuard } from '../src/rate.guard'
import { PassportUser } from '../src/user.entity'
import { UserService } from '../src/user.service'
import {
  ADMIN_SECURED_DATA,
  LIMITED_SECURED_DATA,
  SECURED_DATA,
} from './expectations'

@Controller()
export class LoginController {
  constructor(private readonly auth: AuthService) {}

  @Post('login')
  @UseGuards(LocalGuard)
  @HttpCode(HttpStatus.OK)
  login(@CurrentUser() user: PassportUser) {
    return this.auth.allow(user)
  }
}

@Controller()
class RestrictedController {
  constructor(private readonly auth: AuthService) {}

  @Get('secured')
  @UseGuards(JwtGuard)
  secured() {
    return SECURED_DATA
  }

  @Get('admin/secured')
  @Roles('admin')
  @UseGuards(JwtGuard, RolesGuard)
  adminSecured() {
    return ADMIN_SECURED_DATA
  }

  @Get('secured/limited')
  @RateLimit(1000)
  @UseGuards(JwtGuard, RateGuard)
  limited() {
    return LIMITED_SECURED_DATA
  }
}

const JWT_MODULE_OPTIONS: JwtModuleOptions = {
  secret: 'some-jwt-secret',
  signOptions: { expiresIn: '15m' },
}

@Module({
  imports: [
    PassportModule.register({
      session: false,
      // defaultStrategy: 'jwt',
    }),
    JwtModule.register(JWT_MODULE_OPTIONS),
  ],
  providers: [
    { provide: 'JWT_MODULE_OPTIONS', useValue: JWT_MODULE_OPTIONS },
    JwtService,
    HitService,
    UserService,
    AuthService,
    LocalStrategy,
    JwtQueryStrategy,
    JwtBearerStrategy,
    RateStrategy,
  ],
  controllers: [LoginController, RestrictedController],
})
export class AppModule {}

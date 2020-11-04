import { AuthGuard } from '@nestjs/passport'

export class JwtGuard extends AuthGuard(['jwt.bearer', 'jwt.query']) {}

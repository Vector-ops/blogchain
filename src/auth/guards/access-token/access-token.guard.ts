import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import jwtConfig from 'src/auth/config/jwt.config';
import { REQUEST_USER_KEY } from 'src/auth/constants/auth.constants';

@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,

    private readonly jwtService: JwtService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: Request = context.switchToHttp().getRequest();

    const token: string = this.extractToken(req);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        this.jwtConfiguration,
      );

      req[REQUEST_USER_KEY] = payload;
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractToken(request: Request): string | undefined {
    const [_, token] = request.headers.authorization?.split(' ') ?? [];

    return token;
  }
}

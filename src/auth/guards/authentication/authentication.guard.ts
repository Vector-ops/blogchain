import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { AUTH_TYPE_KEY } from 'src/auth/constants/auth.constants';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { AuthType } from 'src/auth/enums/auth-type.enum';
import { AccessTokenGuard } from '../access-token/access-token.guard';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly accessTokenGuard: AccessTokenGuard,
  ) {}

  private static readonly defaultAuthType = AuthType.Bearer;

  private readonly authTypeGuardMap: Record<
    AuthType,
    CanActivate | CanActivate[]
  > = {
    [AuthType.Bearer]: this.accessTokenGuard,
    [AuthType.None]: { canActivate: () => true },
  };
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // get auth types from the decorator
    const authTypes: AuthType[] = this.reflector.getAllAndOverride(
      AUTH_TYPE_KEY,
      [context.getHandler(), context.getClass()],
    ) ?? [AuthenticationGuard.defaultAuthType];

    // get the guards from the authguard map
    const gaurds = authTypes
      .map((authType) => this.authTypeGuardMap[authType])
      .flat();

    let error = new UnauthorizedException();

    // call the canActivate method on each guard
    for (const instance of gaurds) {
      const canActivate = await Promise.resolve(
        instance.canActivate(context),
      ).catch((e) => {
        error = e;
      });

      if (canActivate) return true;
    }

    throw error;
  }
}

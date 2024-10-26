import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/providers/user.service';
import { RefreshTokenDto } from '../dto/refreshtoken.dto';
import { SignInDto } from '../dto/signin.dto';
import { RefreshTokensProvider } from './refresh-tokens.provider';
import { SigninProvider } from './signin.provider';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,

    private readonly signInProvider: SigninProvider,
    private readonly refreshTokenProvider: RefreshTokensProvider,
  ) {}

  public async signIn(signInDto: SignInDto) {
    return await this.signInProvider.signIn(signInDto);
  }

  public async refreshToken(refreshTokenDto: RefreshTokenDto) {
    return this.refreshTokenProvider.refreshTokens(refreshTokenDto);
  }
}

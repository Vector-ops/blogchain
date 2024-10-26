import {
  forwardRef,
  Inject,
  Injectable,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/providers/user.service';
import jwtConfig from '../config/jwt.config';
import { RefreshTokenDto } from '../dto/refreshtoken.dto';
import { IActiveUser } from '../interfaces/activeuser.interface';
import { GenerateTokensProvider } from './generatetokens.provider';

@Injectable()
export class RefreshTokensProvider {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly generateTokenProvider: GenerateTokensProvider,

    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  public async refreshTokens(refreshTokenDto: RefreshTokenDto) {
    try {
      const { sub } = await this.jwtService.verifyAsync<
        Pick<IActiveUser, 'sub'>
      >(refreshTokenDto.refreshToken, {
        secret: this.jwtConfiguration.secret,
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
      });

      const user = await this.userService.findOneById(sub);

      return await this.generateTokenProvider.generateTokens(user);
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}

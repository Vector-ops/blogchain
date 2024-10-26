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
import { SignInDto } from '../dto/signin.dto';
import { HashProvider } from './hash.provider';

import { User } from 'src/user/user.entity';
import jwtConfig from '../config/jwt.config';
import { IActiveUser } from '../interfaces/activeuser.interface';

@Injectable()
export class SigninProvider {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private readonly hashProvider: HashProvider,
    private readonly jwtService: JwtService,

    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  public async signIn(signInDto: SignInDto) {
    let isEqual: boolean = false;
    let user: User = undefined;
    try {
      user = await this.userService.findOneByEmail(signInDto.email);
      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      isEqual = await this.hashProvider.comparePassword(
        signInDto.password,
        user.password,
      );
    } catch (error) {
      console.log(error);
      throw new RequestTimeoutException('Failed to compare password');
    }
    if (!isEqual) {
      throw new UnauthorizedException('Invalid email/password');
    }

    const accessToken = await this.jwtService.signAsync(
      {
        sub: user.id,
        email: user.email,
      } as IActiveUser,
      {
        audience: this.jwtConfiguration.audience,
        expiresIn: this.jwtConfiguration.accessTokenTTL,
        secret: this.jwtConfiguration.secret,
        issuer: this.jwtConfiguration.issuer,
      },
    );

    return { accessToken };
  }
}

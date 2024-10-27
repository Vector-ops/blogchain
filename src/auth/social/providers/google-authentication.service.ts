import {
  forwardRef,
  Inject,
  Injectable,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { OAuth2Client } from 'google-auth-library';
import jwtConfig from 'src/auth/config/jwt.config';
import { GenerateTokensProvider } from 'src/auth/providers/generatetokens.provider';
import { IGoogleUser } from 'src/user/interfaces/googleuser.interface';
import { UserService } from 'src/user/providers/user.service';
import { GoogleTokenDto } from '../dto/googletoken.dto';

@Injectable()
export class GoogleAuthenticationService implements OnModuleInit {
  private OAuthClient: OAuth2Client;

  constructor(
    private readonly jwtService: JwtService,
    private readonly generateTokenProvider: GenerateTokensProvider,

    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,

    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  onModuleInit() {
    const clientId = this.jwtConfiguration.googleClientId;
    const clientSecret = this.jwtConfiguration.googleClientSecret;

    this.OAuthClient = new OAuth2Client(clientId, clientSecret);
  }

  public async authenticate(googleTokenDto: GoogleTokenDto) {
    try {
      const loginTicket = await this.OAuthClient.verifyIdToken({
        idToken: googleTokenDto.token,
      });

      const {
        sub: googleId,
        email,
        given_name: firstName,
        family_name: lastName,
      } = loginTicket.getPayload();

      const user = await this.userService.findOneByGoogleId(googleId);

      if (user) {
        return this.generateTokenProvider.generateTokens(user);
      }

      const newUser = await this.userService.createGoogleUser({
        googleId,
        email,
        firstName,
        lastName,
      } as IGoogleUser);

      return this.generateTokenProvider.generateTokens(newUser);
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}

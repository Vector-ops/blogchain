import {
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from 'src/auth/providers/auth.service';
import { GetUserParamDto } from '../dto/getuserparam.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  private users = [
    {
      id: 123,
      firstName: 'John',
      lastName: 'Doe',
      email: 'sexyjohn@gmail.com',
      password: 'Unsecure@123',
    },
    {
      id: 1244,
      firstName: 'Joe',
      lastName: 'Mama',
      email: 'Joemama@gmail.com',
      password: 'Unsecure@123',
    },
    {
      id: 125,
      firstName: 'Local',
      lastName: 'Milfs',
      email: 'sendlocation@gmail.com',
      password: 'Unsecure@123',
    },
    {
      id: 126,
      firstName: 'jake',
      lastName: 'Paul',
      email: 'Iamjake@gmail.com',
      password: 'Unsecure@123',
    },
  ];

  public findAll(
    getUserParamDto: GetUserParamDto,
    limit: number,
    page: number,
  ) {
    const isAuth = this.authService.isAuthenticated(getUserParamDto.id);

    return isAuth
      ? this.users
      : new UnauthorizedException('Login and try again');
  }

  public findOneById(id: number) {
    return this.users.find((user) => user.id === id);
  }

  public findOneByEmail(email: string) {
    return this.users.find((user) => user.email === email);
  }
}

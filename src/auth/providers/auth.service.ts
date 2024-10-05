import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/providers/user.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  public login(email: string, password: string) {
    const user = this.userService.findOneByEmail(email);
    return 'SAMPLE_TOKEN';
  }

  public isAuthenticated(id: number) {
    return true;
  }
}

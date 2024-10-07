import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/providers/auth.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/createuser.dto';
import { GetUserParamDto } from '../dto/getuserparam.dto';
import { User } from '../user.entity';

/**
 * Class to connect to user table and perform business logic
 */
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public async createUser(createUserDto: CreateUserDto) {
    const user = await this.userRepository.findOne({
      where: {
        email: createUserDto.email,
      },
    });

    let newUser = this.userRepository.create(createUserDto);

    newUser = await this.userRepository.save(newUser);

    return newUser;
  }

  /**
   * Method to get all users from database
   * @param getUserParamDto
   * @param limit
   * @param page
   * @returns
   */
  public findAll(
    getUserParamDto: GetUserParamDto,
    limit: number,
    page: number,
  ) {
    return 'yes';
  }

  /**
   * Method to find an user by id
   * @param id
   * @returns
   */
  public findOneById(id: number) {
    return 'this';
  }

  /**
   * Method to find an user by email
   * @param email
   * @returns
   */
  public findOneByEmail(email: string) {
    return 'this';
  }
}

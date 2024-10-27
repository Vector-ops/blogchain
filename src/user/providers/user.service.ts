import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateManyUsersDto } from '../dto/createmanyusers.dto';
import { CreateUserDto } from '../dto/createuser.dto';
import { GetUserParamDto } from '../dto/getuserparam.dto';
import { IGoogleUser } from '../interfaces/googleuser.interface';
import { User } from '../user.entity';
import { CreateGoogleUserProvider } from './create-google-user.provider';
import { CreateuserProvider } from './createuser.provider';
import { FindOneByGoogleIdProvider } from './find-one-by-google-id.provider';
import { UserCreateManyProvider } from './usercreatemany.provider';

/**
 * Class to connect to user table and perform business logic
 */
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly dataSource: DataSource,
    private readonly userCreateManyProvider: UserCreateManyProvider,
    private readonly createUserProvider: CreateuserProvider,
    private readonly findOneByGoogleIdProvider: FindOneByGoogleIdProvider,
    private readonly createGoogleUserProvider: CreateGoogleUserProvider,
  ) {}

  public async create(createUserDto: CreateUserDto) {
    return this.createUserProvider.createUser(createUserDto);
  }

  /**
   * Method to get all users from database
   * @param getUserParamDto
   * @param limit
   * @param page
   * @returns
   */
  public async findAll(
    getUserParamDto: GetUserParamDto,
    limit: number,
    page: number,
  ) {
    let users = undefined;
    try {
      users = await this.userRepository.find({
        take: limit * page,
        skip: limit,
      });
    } catch (error) {
      console.log(error);
      throw new RequestTimeoutException(
        'Unable to process request at the moment.',
        {
          description: 'Error connecting to the database',
        },
      );
    }

    if (!users) {
      throw new InternalServerErrorException();
    }

    return users;
  }

  /**
   * Method to find an user by id
   * @param id
   * @returns
   */
  public async findOneById(id: number) {
    let user = undefined;
    try {
      user = await this.userRepository.findOneBy({ id });
    } catch (error) {
      console.log(error);
      if (error.statusCode === 400) {
        return error;
      }

      throw new RequestTimeoutException(
        'Unable to process request at the moment.',
        {
          description: 'Error connecting to the database',
        },
      );
    }
    if (!user) {
      throw new BadRequestException('User does not exist');
    }
    return user;
  }

  /**
   * Method to find an user by email
   * @param email
   * @returns
   */
  public async findOneByEmail(email: string) {
    let user = undefined;

    try {
      return await this.userRepository.findOneBy({ email });
    } catch (error) {
      console.log(error);
      throw new RequestTimeoutException(
        'Unable to process request at the moment.',
        {
          description: 'Error connecting to the database',
        },
      );
    }
  }

  public async createMany(createManyUsersDto: CreateManyUsersDto) {
    return await this.userCreateManyProvider.createMany(createManyUsersDto);
  }

  public async findOneByGoogleId(googleId: string) {
    return await this.findOneByGoogleIdProvider.findOneByGoogleId(googleId);
  }

  public async createGoogleUser(googleUser: IGoogleUser) {
    return await this.createGoogleUserProvider.createGoogleUser(googleUser);
  }
}

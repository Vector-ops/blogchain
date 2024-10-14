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
import { User } from '../user.entity';
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
  ) {}

  public async createUser(createUserDto: CreateUserDto) {
    let existingUser = undefined;
    try {
      existingUser = await this.userRepository.findOne({
        where: {
          email: createUserDto.email,
        },
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

    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    let newUser = this.userRepository.create(createUserDto);

    try {
      newUser = await this.userRepository.save(newUser);
    } catch (error) {
      console.log(error);
      throw new RequestTimeoutException(
        'Unable to process request at the moment.',
        {
          description: 'Error connecting to the database',
        },
      );
    }

    return newUser;
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
    try {
      const user = await this.userRepository.findOneBy({ id });
      if (!user) {
        throw new BadRequestException('User does not exist');
      }
      return user;
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

  /**
   * Method to find an user by email
   * @param email
   * @returns
   */
  public async findOneByEmail(email: string) {
    let user = undefined;

    try {
      user = await this.userRepository.findOneBy({ email });
    } catch (error) {
      console.log(error);
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

  public async createMany(createManyUsersDto: CreateManyUsersDto) {
    return await this.userCreateManyProvider.createMany(createManyUsersDto);
  }
}

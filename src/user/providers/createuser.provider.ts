import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HashProvider } from 'src/auth/providers/hash.provider';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/createuser.dto';
import { User } from '../user.entity';

@Injectable()
export class CreateuserProvider {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @Inject(forwardRef(() => HashProvider))
    private readonly hashprovider: HashProvider,
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

    let newUser = this.userRepository.create({
      ...createUserDto,
      password: await this.hashprovider.hashPassword(createUserDto.password),
    });

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
}

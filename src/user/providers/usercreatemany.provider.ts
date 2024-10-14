import {
  BadRequestException,
  ConflictException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreateManyUsersDto } from '../dto/createmanyusers.dto';
import { User } from '../user.entity';

@Injectable()
export class UserCreateManyProvider {
  constructor(private readonly dataSource: DataSource) {}
  public async createMany(createManyUsersDto: CreateManyUsersDto) {
    let newUsers: User[] = [];

    const queryRunner = this.dataSource.createQueryRunner();

    try {
      await queryRunner.connect();

      await queryRunner.startTransaction();
    } catch (error) {
      throw new RequestTimeoutException('Could not connect to the database');
    }
    try {
      for (let user of createManyUsersDto.users) {
        let newUser = queryRunner.manager.create(User, user);
        let result = await queryRunner.manager.save(newUser);
        newUsers.push(result);
      }
      await queryRunner.commitTransaction();
    } catch (error) {
      console.log(error);
      await queryRunner.rollbackTransaction();
      throw new ConflictException('Could not complete transaction', {
        description: String(error),
      });
    } finally {
      await queryRunner.release();
    }

    return newUsers;
  }
}

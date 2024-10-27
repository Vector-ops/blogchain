import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user.entity';

@Injectable()
export class FindOneByGoogleIdProvider {
  constructor(
    @InjectRepository(User)
    private readonly userRepositry: Repository<User>,
  ) {}

  public async findOneByGoogleId(googleId: string) {
    return await this.userRepositry.findOneBy({ googleId });
  }
}

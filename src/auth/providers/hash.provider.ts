import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class HashProvider {
  constructor() {}

  abstract hashPassword(data: string | Buffer): Promise<string>;
  abstract comparePassword(
    data: string | Buffer,
    hash: string,
  ): Promise<boolean>;
}

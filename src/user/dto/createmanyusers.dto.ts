import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, ValidateNested } from 'class-validator';
import { CreateUserDto } from './createuser.dto';

export class CreateManyUsersDto {
  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateUserDto)
  users: CreateUserDto[];
}

import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateManyUsersDto } from './dto/createmanyusers.dto';
import { CreateUserDto } from './dto/createuser.dto';
import { GetUserParamDto } from './dto/getuserparam.dto';
import { UpdateUserDto } from './dto/updateuser.dto';
import { UserService } from './providers/user.service';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/:id?')
  @ApiQuery({
    name: 'limit',
    type: 'number',
    required: false,
    description: 'Limit the number of user entries per page',
    example: 10,
  })
  @ApiQuery({
    name: 'page',
    type: 'number',
    required: false,
    description: 'Page number',
    example: 1,
  })
  @ApiOperation({
    summary: 'Fetches a list of registered users',
  })
  @ApiResponse({
    status: 200,
    description: 'User fetched successfully',
  })
  public getUser(
    @Param() getUserParamDto: GetUserParamDto,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe)
    limit: number | undefined,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe)
    page: number | undefined,
  ) {
    return this.userService.findAll(getUserParamDto, limit, page);
  }

  @Post()
  public createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Patch('/:id')
  public updateUser(@Body() updateUserDto: UpdateUserDto) {
    return `Updated user`;
  }

  @Post('/create-many')
  public createManyUsers(@Body() createManyUsersDto: CreateManyUsersDto) {
    return this.userService.createMany(createManyUsersDto);
  }
}

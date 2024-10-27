import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import jwtConfig from 'src/auth/config/jwt.config';
import { AccessTokenGuard } from 'src/auth/guards/access-token/access-token.guard';
import { CreateuserProvider } from './providers/createuser.provider';
import { UserService } from './providers/user.service';
import { UserCreateManyProvider } from './providers/usercreatemany.provider';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { FindOneByGoogleIdProvider } from './providers/find-one-by-google-id.provider';
import { CreateGoogleUserProvider } from './providers/create-google-user.provider';

@Module({
  controllers: [UserController],
  providers: [UserService, UserCreateManyProvider, CreateuserProvider, FindOneByGoogleIdProvider, CreateGoogleUserProvider],
  exports: [UserService],
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => AuthModule)],
})
export class UserModule {}

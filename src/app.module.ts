import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Import Modules
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from './auth/auth.module';
import { MetaoptionModule } from './metaoption/metaoption.module';
import { PostModule } from './post/post.module';
import { TagsModule } from './tags/tags.module';

@Module({
  imports: [
    UserModule,
    PostModule,
    AuthModule,
    TagsModule,
    MetaoptionModule,
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRootAsync({
      imports: [],
      inject: [],
      useFactory: () => ({
        type: 'postgres',
        // entities: [User],
        autoLoadEntities: true,
        synchronize: true,
        port: 5432,
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        host: 'localhost',
        database: process.env.POSTGRES_DB,
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
